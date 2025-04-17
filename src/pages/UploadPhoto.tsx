
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PhotoUpload from '../components/upload/PhotoUpload';

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [garment, setGarment] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
    
    // Check if a garment was selected
    const selectedGarment = localStorage.getItem('selectedGarment');
    if (!selectedGarment) {
      navigate('/scan-qr');
    } else {
      setGarment(JSON.parse(selectedGarment));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Upload Your Photo</h1>
            <p className="text-gray-500">
              {garment ? `To try on: ${garment.name}` : 'Upload a photo for virtual try-on'}
            </p>
          </header>
          
          <PhotoUpload />
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
