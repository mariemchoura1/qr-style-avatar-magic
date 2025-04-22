
import React, { useRef } from "react";

const SAMPLE = {
  id: "denim-jacket-123",
  name: "Blue Denim Jacket",
  image:
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop",
};

const ScanQR = ({ onScan }) => {
  const fileInputRef = useRef();

  // For demo: "Scan" just uses prefilled data; "Upload" (simulate QR image) just proceeds with same data
  const handleScan = () => onScan(SAMPLE);

  const handleFile = (e) => {
    if (e.target.files?.[0]) {
      // In real app: decode QR from the image
      // For minimal case, just fake it
      onScan(SAMPLE);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Scan/Upload QR Code</h2>
      <button
        className="mb-4 px-4 py-2 rounded bg-purple-600 text-white font-medium"
        onClick={handleScan}
      >
        Simulate Scan QR Code
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFile}
      />
      <button
        className="mb-2 px-4 py-2 rounded bg-gray-200 text-gray-700"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload QR Code Image
      </button>
    </div>
  );
};

export default ScanQR;
