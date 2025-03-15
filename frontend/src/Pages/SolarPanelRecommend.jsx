import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import solar from "../assets/solar.jpg"; // Import your background image

const SolarPanel = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const [allowedCapacity, setAllowedCapacity] = useState(null);
  const [showProceedButton, setShowProceedButton] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/locations/getAll`);
        if (response.data.status) {
          setLocations(response.data.locations);
        } else {
          console.error("Error fetching locations:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle form submission to get allowed capacity
  const handleGetCapacity = async (e) => {
    e.preventDefault();

    if (!selectedLocation || !landSize) {
      alert("Please select a location and enter a land size.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/solar/allowed-capacity`, {
        location: selectedLocation,
        landSize: Number(landSize),
      });

      if (response.data.success) {
        setAllowedCapacity(response.data.data.allowed_capacity);
        setShowProceedButton(true); // Show "Proceed" button after getting capacity
      } else {
        console.error("Error fetching allowed capacity:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  // Handle navigation to cost estimation page
  const handleProceedToCostEstimation = () => {
    navigate("/cost-estimation", {
      state: {
        location: selectedLocation,
        landSize: landSize,
        allowedCapacity: allowedCapacity,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative h-[250px] w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${solar})` }}
      >
        <h1 className="relative text-4xl md:text-5xl font-bold text-black text-center">
          Solar Panel Solutions
        </h1>
      </section>

      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Solar Panel Inquiry</h1>

        <form onSubmit={handleGetCapacity} className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
          {/* Location Dropdown */}
          <label className="block text-gray-700 font-semibold mb-2">Choose a Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Land Size Input */}
          <label className="block text-gray-700 font-semibold mb-2">Enter Land Size (m²):</label>
          <input
            type="number"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            placeholder="Enter land size"
            className="w-full p-2 border rounded-md mb-4"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-md font-bold hover:bg-yellow-700 transition"
          >
            Get Allowed Capacity
          </button>
        </form>

        {/* Display Allowed Capacity */}
        {allowedCapacity !== null && (
          <div className="mt-6 p-4 bg-gray-200 rounded-md text-center w-full max-w-md">
            <h2 className="text-xl font-semibold">Allowed Capacity:</h2>
            <p className="text-gray-700 mt-2">{allowedCapacity} kW</p>
          </div>
        )}

        {/* Proceed Button (Visible After Getting Allowed Capacity) */}
        {showProceedButton && (
          <button
            onClick={handleProceedToCostEstimation}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition max-w-md"
          >
            Proceed to Cost Estimation
          </button>
        )}
      </div>
    </div>
  );
};

export default SolarPanel;
