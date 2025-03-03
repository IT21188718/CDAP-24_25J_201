from flask import Flask, request, jsonify
import pandas as pd
import joblib

# Load trained models and datasets
model = joblib.load('./pickle/linear_regression_model.pkl')
efficiency_model = joblib.load('./pickle/efficiency_model.pkl')
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

    if not location or not land_size or not desired_capacity:
        return jsonify({"error": "Location, land size, and desired capacity are required"}), 400

    desired_capacity_w = desired_capacity * 1000  # Convert kW to W

    # Find allowed capacity based on location
    substation_row = substation_data[substation_data['Name of the Substation'] == location.lower()]
    allowed_capacity = substation_row['Allowed Capacity (W)'].values[0] if not substation_row.empty else None

    # Ensure allowed_capacity is present
    if not allowed_capacity:
        allowed_capacity = desired_capacity_w  # Use desired capacity as fallback

    # ✅ Fix: Allow capacity up to the allowed limit
    max_capacity_w = min(desired_capacity_w, allowed_capacity)

    # ✅ Fix: Adjust filtering to include panels within capacity range
    tolerance = 0.1  # 10% tolerance
    matching_panels = solar_data[
        (solar_data['Min Power (W)'] <= max_capacity_w * (1 + tolerance)) &
        (solar_data['Max Power (W)'] >= max_capacity_w * (1 - tolerance))
    ]

    # ✅ Fix: If no exact match, find the closest available panels
    if matching_panels.empty:
        solar_data['Difference'] = abs(solar_data['Max Power (W)'] - max_capacity_w)
        matching_panels = solar_data.nsmallest(5, 'Difference')
        if matching_panels.empty:  # ✅ FIXED ERROR HERE
            return jsonify({"error": "No matching panels found, even with closest selection."}), 400

    avg_panel_size = matching_panels['Panel Size'].mean()
    avg_efficiency = matching_panels['Panel Efficiency (%) At STC'].mean()
    avg_price = matching_panels['Price'].mean()
    predicted_panels = model.predict(pd.DataFrame([{
        'Min Power (W)': max_capacity_w * 0.8,
        'Max Power (W)': max_capacity_w * 1.2,
        'Allowed Capacity (W)': allowed_capacity,
        'Panel Efficiency (%) At STC': avg_efficiency,
        'Price': avg_price
    }]))[0]

    panels_fit_in_land = int(land_size / avg_panel_size)
    final_price = avg_price * panels_fit_in_land

    return jsonify({
        "location": location,
        "land_size": int(land_size),
        "allowed_capacity": int(allowed_capacity / 1000),  # Convert to kW
        "desired_capacity": int(desired_capacity),
        "avg_efficiency": float(avg_efficiency),
        "avg_price": round(float(avg_price), 2),
        "predicted_panels": int(predicted_panels),
        "panels_fit_in_land": int(panels_fit_in_land),
        "final_price": round(float(final_price), 2)
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
