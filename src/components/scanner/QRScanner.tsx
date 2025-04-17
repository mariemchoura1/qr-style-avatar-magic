
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, Camera, CameraOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setHasPermission(true);
        
        // Mock successful scan after a few seconds
        setTimeout(() => {
          if (isScanning) {
            stopScanner();
            mockSuccessfulScan();
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      });
    }
  };
  
  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsScanning(false);
    }
  };
  
  const mockSuccessfulScan = () => {
    toast({
      title: "QR Code Detected!",
      description: "Garment: Blue Denim Jacket",
    });
    
    // Store garment info in localStorage
    localStorage.setItem('selectedGarment', JSON.stringify({
      id: 'denim-jacket-123',
      name: 'Blue Denim Jacket',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=2574&auto=format&fit=crop'
    }));
    
    // Navigate to upload photo page
    navigate('/upload-photo');
  };
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (isScanning) {
        stopScanner();
      }
    };
  }, [isScanning]);
  
  return (
    <Card className="w-full animate-fade-in">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-full max-w-md aspect-square bg-gray-100 rounded-lg overflow-hidden mb-6">
          {isScanning ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              {hasPermission === false ? (
                <div className="text-center p-4">
                  <CameraOff className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Camera access denied</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Start scanner to detect QR codes</p>
                </div>
              )}
            </div>
          )}
          
          {isScanning && (
            <>
              <div className="absolute inset-0 border-2 border-brand-purple rounded-lg"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-2 border-white rounded-md"></div>
            </>
          )}
        </div>
        
        {isScanning ? (
          <Button onClick={stopScanner} variant="outline" className="gap-2">
            <CameraOff className="h-4 w-4" /> Stop Scanner
          </Button>
        ) : (
          <Button onClick={startScanner} className="gap-2">
            <Scan className="h-4 w-4" /> Start Scanner
          </Button>
        )}
        
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Align the QR code within the frame to scan
        </p>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
