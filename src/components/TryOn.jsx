
import React from "react";

const TryOn = ({ garment, userPhoto, onRestart }) => {
  if (!garment || !userPhoto) {
    return (
      <div className="text-center">
        <p className="mb-4 text-gray-700">Missing garment or photo information.</p>
        <button
          onClick={onRestart}
          className="px-4 py-2 rounded bg-purple-600 text-white"
        >
          Start Over
        </button>
      </div>
    );
  }

  // Overlay the garment as a semi-transparent layer for demo
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Virtual Try-On Result</h2>
      <div className="relative w-48 h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={userPhoto}
          alt="User"
          className="absolute w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        <img
          src={garment.image}
          alt={garment.name}
          className="absolute w-full h-full object-contain opacity-80"
          style={{ zIndex: 2, mixBlendMode: "multiply" }}
        />
      </div>
      <div className="mb-4 text-gray-800 font-medium">{garment.name}</div>
      <button
        onClick={onRestart}
        className="px-4 py-2 rounded bg-purple-600 text-white"
      >
        Try Another
      </button>
    </div>
  );
};

export default TryOn;
