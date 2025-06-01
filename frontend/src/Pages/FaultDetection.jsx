import React, { useState } from 'react';

const FaultDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select an image');

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error predicting the image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="max-w-md mx-auto mt-30 p-8 bg-white rounded-xl shadow-lg font-sans text-center mb-60">
    {/* Title above form */}
    <h1 className="text-3xl font-bold text-gray-900 mb-12">Solar Panel Fault Detection</h1>

    {/* Form moved slightly down */}
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 mt-4">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="block w-full max-w-xs text-gray-700
                   file:border file:border-gray-300 file:rounded-md
                   file:px-4 file:py-2 file:bg-white file:text-sm
                   file:font-semibold file:text-gray-700
                   hover:file:bg-gray-100 cursor-pointer"
      />
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full max-w-xs px-6 py-3 rounded-md font-semibold text-white
                    transition-colors duration-300
                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>
    </form>

    {result && (
      <div className={`mt-8 p-4 rounded-md border text-lg
                      ${result.fault ? 'border-red-400 text-red-700 bg-red-50' : 'border-green-400 text-green-700 bg-green-50'}`}>
        {result.fault ? (
          <p className="font-semibold">
            ⚠️ Fault detected! Issue: <strong>{result.feedback}</strong>
          </p>
        ) : (
          <p className="font-semibold">
            ✅ No fault detected. Panel is <strong>{result.feedback}</strong>.
          </p>
        )}
      </div>
    )}
  </div>
);

};

export default FaultDetection;
