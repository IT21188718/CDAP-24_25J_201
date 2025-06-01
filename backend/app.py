from flask import Flask, request, jsonify
import pandas as pd
import joblib
from tensorflow.keras.models import load_model
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from flask_cors import CORS

 
# Load trained models and datasets
model = joblib.load('./pickle/linear_regression_model.pkl')
price_model = joblib.load('./pickle/price_model.pkl')
size_model = joblib.load('./pickle/size_model.pkl')
solar_data = pd.read_excel('./Synthetic_Env_SolarData_Optimized.xlsx')
substation_data = pd.read_excel('./Sub_Station_data.xlsx')

# Strip and standardize column names
solar_data.columns = solar_data.columns.str.strip()
substation_data.columns = substation_data.columns.str.strip()

# Ensure solar panel power range is properly split
if 'Series Power Range (Wp)' in solar_data.columns:
    solar_data[['Min Power (Wp)', 'Max Power (Wp)']] = solar_data['Series Power Range (Wp)'].str.split('~', expand=True).astype(float)
    solar_data['Min Power (W)'] = solar_data['Min Power (Wp)'] * 1000
    solar_data['Max Power (W)'] = solar_data['Max Power (Wp)'] * 1000
else:
    raise KeyError("Column 'Series Power Range (Wp)' not found in solar_data")

# Ensure panel size calculation
if 'Height (mm)' in solar_data.columns and 'Width (mm)' in solar_data.columns:
    solar_data['Panel Size'] = (solar_data['Height (mm)'] * solar_data['Width (mm)']) / 1_000_000
else:
    raise KeyError("Columns 'Height (mm)' or 'Width (mm)' missing in solar_data")

# Preprocess substation data
substation_data['Allowed Capacity (W)'] = substation_data['Allowed Capacity'] * 1000
substation_data['Name of the Substation'] = substation_data['Name of the Substation'].str.strip().str.lower()

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# -------------------------------
# 1️⃣ STEP 1: Get Allowed Capacity
# -------------------------------
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    location = data.get('location')
    land_size = data.get('land_size')

    if not location or not land_size:
        return jsonify({"error": "Location and land_size are required"}), 400

    location = location.strip().lower()

    # Find allowed capacity
    substation_row = substation_data[substation_data['Name of the Substation'] == location]
    if substation_row.empty:
        return jsonify({"error": f"Location '{location}' not found in substation data."}), 400

    allowed_capacity = substation_row['Allowed Capacity (W)'].values[0]

    return jsonify({
        "location": location,
        "land_size": int(land_size),
        "allowed_capacity": int(allowed_capacity / 1000)  # Convert W to kW
    })

# -------------------------------
# 2️⃣ STEP 2: Calculate Cost & Panels
# -------------------------------@app.route('/calculate_cost', methods=['POST'])
@app.route('/calculate_cost', methods=['POST'])
def calculate_cost():
    data = request.get_json()
    location = data.get('location')
    land_size = data.get('land_size')
    desired_capacity = data.get('desired_capacity')

    # Validate input parameters
    if not location or not land_size or not desired_capacity:
        return jsonify({"error": "Location, land size, and desired capacity are required"}), 400

    # Convert desired capacity to watts (kW to W)
    desired_capacity_w = desired_capacity * 1000  

    # Find the allowed capacity for the given location
    substation_row = substation_data[substation_data['Name of the Substation'] == location.lower()]
    allowed_capacity = substation_row['Allowed Capacity (W)'].values[0] if not substation_row.empty else None

    if allowed_capacity is None:
        return jsonify({"error": f"Allowed capacity not found for location '{location}'"}), 400

    # Ensure max capacity does not exceed allowed capacity
    max_capacity_w = min(desired_capacity_w, allowed_capacity)

    # Filter solar panels that match capacity requirements within tolerance
    tolerance = 0.1  # 10% tolerance
    matching_panels = solar_data[
        (solar_data['Min Power (W)'] <= max_capacity_w * (1 + tolerance)) &
        (solar_data['Max Power (W)'] >= max_capacity_w * (1 - tolerance))
    ]

    # If no exact match, find closest available panels
    if matching_panels.empty:
        solar_data['Difference'] = abs(solar_data['Max Power (W)'] - max_capacity_w)
        matching_panels = solar_data.nsmallest(5, 'Difference')

        if matching_panels.empty:
            return jsonify({"error": "No suitable panels found even with closest selection."}), 400

    # Compute average panel properties
    avg_panel_size = matching_panels['Panel Size'].mean()
    avg_efficiency = matching_panels['Panel Efficiency (%) At STC'].mean()
    avg_price = matching_panels['Price'].mean()

    # Prepare input for model prediction
    input_data = pd.DataFrame([{
        'Min Power (W)': max_capacity_w * 0.8,
        'Max Power (W)': max_capacity_w * 1.2,
        'Allowed Capacity (W)': allowed_capacity,
        'Panel Efficiency (%) At STC': avg_efficiency,
        'Price': avg_price
    }])

    # Predict number of panels needed
    try:
        predicted_panels = abs(int(model.predict(input_data)[0]))  # Ensure non-negative value
    except Exception as e:
        return jsonify({"error": f"Model prediction error: {str(e)}"}), 500

    # Calculate panels that fit in the land size
    panels_fit_in_land = max(1, int(land_size / avg_panel_size))  # Ensure at least 1 panel

    # Calculate total cost
    final_price = round(avg_price * panels_fit_in_land, 2)

    # Return formatted results
    return jsonify({
        "location": location,
        "land_size": int(land_size),
        "allowed_capacity": int(allowed_capacity / 1000),  # Convert to kW
        "desired_capacity": int(desired_capacity),
        "avg_efficiency": round(float(avg_efficiency), 2),
        "avg_price": round(float(avg_price), 2),
        "predicted_panels": predicted_panels,
        "panels_fit_in_land": panels_fit_in_land,
        "final_price": final_price
    })



# Load the model once when the server starts
model = load_model('./pickle/solar_fault_model.h5')

class_names = ['Bird-drop', 'Clean', 'Dusty', 'Electrical-damage', 'Physical-Damage', 'Snow-Covered']
IMG_SIZE = (224, 224)

def prepare_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB').resize(IMG_SIZE)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, 0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    img_bytes = file.read()
    img_array = prepare_image(img_bytes)
    
    preds = model.predict(img_array)
    predicted_class = class_names[np.argmax(preds[0])]
    fault = predicted_class != 'Clean'

    return jsonify({
        'fault': fault,
        'feedback': predicted_class
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
