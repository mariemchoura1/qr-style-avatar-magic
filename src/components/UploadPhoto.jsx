
import React, { useRef, useState } from "react";

const UploadPhoto = ({ onUpload, onBack }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Upload Your Photo</h2>
      <div className="w-48 h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400">No photo</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFile}
      />
      <button
        className="mb-2 px-4 py-2 rounded bg-purple-500 text-white"
        onClick={() => fileInputRef.current?.click()}
      >
        Choose Photo
      </button>
      <div className="flex gap-2 mt-2">
        <button
          className="px-4 py-2 rounded bg-gray-300 text-gray-700"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={handleContinue}
          disabled={!preview}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UploadPhoto;
