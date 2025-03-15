import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Make sure this is inside the component
  
  useEffect(() => {
    // Fetch recommendations
    fetch(`${API_BASE_URL}/recommendations/getAll`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status && Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
       {/* Previous Page Button */}
       <button
        onClick={() => navigate(-1)}
        className="mt-15 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Previous Page
      </button>
      <h1 className="text-3xl font-bold text-center mb-6">Your Recommendations</h1>

      {loading && <p className="text-center text-gray-600">Loading recommendations...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-800">{rec.location}</h2>
            <p className="text-gray-600 text-sm">Land Size: <strong>{rec.landSize} m²</strong></p>
            <p className="text-gray-600 text-sm">Allowed Capacity: <strong>{rec.allowedCapacity} kW</strong></p>
            {rec.desiredCapacity && (
              <p className="text-gray-600 text-sm">Desired Capacity: <strong>{rec.desiredCapacity} kW</strong></p>
            )}
            <p className="text-gray-600 text-sm">Efficiency: <strong>{rec.avgEfficiency.toFixed(2)}%</strong></p>
            <p className="text-gray-600 text-sm">Avg Price: <strong>Rs.{rec.avgPrice.toFixed(2)}</strong></p>
            {rec.finalPrice && (
              <p className="text-gray-600 text-sm">Final Price: <strong>Rs.{rec.finalPrice.toFixed(2)}</strong></p>
            )}
            <p className="text-gray-600 text-sm">Panels Fit: <strong>{rec.panelsFitInLand}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
