import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CostEstimation = () => {
  const location = useLocation();
  const { location: selectedLocation, landSize, allowedCapacity } = location.state;
  const navigate = useNavigate();

  const [desiredCapacity, setDesiredCapacity] = useState("");
  const [costEstimation, setCostEstimation] = useState(null);
  const [error, setError] = useState(""); // State for error message

  const handleProceedToRecommend = () => {
    navigate("/solar-recommend", {
      state: {
        location: selectedLocation,
        landSize: landSize,
        allowedCapacity: allowedCapacity,
      },
    });
  };

  // Handle cost estimation request
  const handleEstimateCost = async () => {
    const capacity = Number(desiredCapacity);

    // Input validation
    if (!desiredCapacity) {
      setError("Please enter the desired capacity.");
      return;
    }

    if (isNaN(capacity) || capacity <= 0) {
      setError("Desired capacity must be a positive number.");
      return;
    }

    if (capacity > allowedCapacity) {
      setError(`Desired capacity cannot exceed the allowed capacity of ${allowedCapacity} kW.`);
      return;
    }

    setError(""); // Clear error if validation passes

    try {
      const requestData = {
        location: selectedLocation,
        landSize: Number(landSize),
        desiredCapacity: capacity,
      };

      console.log("Sending request:", requestData);

      const response = await axios.post(`${API_BASE_URL}/api/solar/calculate-cost`, requestData);

      if (response.data.success) {
        setCostEstimation(response.data.data);
      } else {
        alert("Error fetching cost estimation.");
      }
    } catch (error) {
      console.error("Error fetching cost estimation:", error);
      alert("Failed to fetch cost estimation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6">Solar Cost Estimation</h1>

      {/* Display location, land size, and allowed capacity */}
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold">Selected Location:</h2>
        <p className="text-gray-700">{selectedLocation}</p>

        <h2 className="text-xl font-semibold mt-4">Land Size:</h2>
        <p className="text-gray-700">{landSize} m²</p>

        <h2 className="text-xl font-semibold mt-4">Allowed Capacity:</h2>
        <p className="text-gray-700">{allowedCapacity} kW</p>

        {/* Input for desired capacity */}
        <label className="block text-gray-700 font-semibold mt-6 mb-2">Enter Desired Capacity (kW):</label>
        <input
          type="number"
          value={desiredCapacity}
          onChange={(e) => setDesiredCapacity(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />

        {/* Error Message Display */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Button to fetch cost estimation */}
        <button
          onClick={handleEstimateCost}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Estimate Cost
        </button>
      </div>

      {/* Display cost estimation in a well-formatted table */}
      {costEstimation && (
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">Cost Estimation</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-semibold">Location:</td>
                <td className="p-3">{costEstimation.location}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Land Size (m²):</td>
                <td className="p-3">{costEstimation.land_size}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Allowed Capacity (kW):</td>
                <td className="p-3">{costEstimation.allowed_capacity}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Desired Capacity (kW):</td>
                <td className="p-3">{costEstimation.desired_capacity}</td>
              </tr>
              {/* <tr className="border-b">
                <td className="p-3 font-semibold">Predicted Efficiency (%):</td>
                <td className="p-3">{costEstimation.avg_efficiency.toFixed(2)}</td>
              </tr> */}
              <tr className="border-b">
                <td className="p-3 font-semibold">Average Price (Rs):</td>
                <td className="p-3">Rs.{costEstimation.avg_price.toLocaleString()}</td>
              </tr>
              {/* <tr className="border-b">
                <td className="p-3 font-semibold">Predicted Panels:</td>
                <td className="p-3">{costEstimation.predicted_panels.toLocaleString()}</td>
              </tr> */}
              <tr className="border-b">
                <td className="p-3 font-semibold">Panels Fit in Land:</td>
                <td className="p-3">{costEstimation.panels_fit_in_land}</td>
              </tr>
              <tr className="border-b bg-gray-100">
                <td className="p-3 font-bold text-lg">Final Cost (Rs):</td>
                <td className="p-3 font-bold text-lg">Rs.{costEstimation.final_price.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleProceedToRecommend}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition max-w-md"
          >
            View Past Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default CostEstimation;
