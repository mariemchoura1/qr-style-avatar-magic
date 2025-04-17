
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import QRScanner from '../components/scanner/QRScanner';

const ScanQR = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Scan QR Code</h1>
            <p className="text-gray-500">
              Scan the QR code on any garment tag or display
            </p>
          </header>
          
          <QRScanner />
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
