
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import VirtualTryOn from '../components/tryon/VirtualTryOn';

const TryOn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
    
    // Check if necessary data is available
    const selectedGarment = localStorage.getItem('selectedGarment');
    const userPhoto = localStorage.getItem('userPhoto');
    
    if (!selectedGarment || !userPhoto) {
      navigate('/scan-qr');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Virtual Try-On</h1>
            <p className="text-gray-500">
              See how the garment looks on you
            </p>
          </header>
          
          <VirtualTryOn />
        </div>
      </div>
    </div>
  );
};

export default TryOn;
