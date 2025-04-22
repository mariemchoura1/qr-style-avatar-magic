
import React, { useState } from "react";
import ScanQR from "./components/ScanQR";
import UploadPhoto from "./components/UploadPhoto";
import TryOn from "./components/TryOn";

// Very minimal step view—change to suit your needs (no react-router)
const App = () => {
  const [step, setStep] = useState(0);
  const [garment, setGarment] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  // Simple navigation functions
  const goToStep = (i) => setStep(i);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-2 py-6">
      <div className="w-full max-w-md">
        {step === 0 && (
          <ScanQR
            onScan={(garmentData) => {
              setGarment(garmentData);
              goToStep(1);
            }}
          />
        )}
        {step === 1 && (
          <UploadPhoto
            onUpload={(photoData) => {
              setUserPhoto(photoData);
              goToStep(2);
            }}
            onBack={() => goToStep(0)}
          />
        )}
        {step === 2 && (
          <TryOn
            garment={garment}
            userPhoto={userPhoto}
            onRestart={() => {
              setGarment(null);
              setUserPhoto(null);
              goToStep(0);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
