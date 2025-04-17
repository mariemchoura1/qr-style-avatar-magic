
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, Camera, CameraOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      if (isScanning) {
        stopScanner();
      }
    };
  }, [isScanning]);
  
  const startScanner = async () => {
    try {
      setCameraError(null);
      console.log("Starting camera...");
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log("Camera stream obtained:", stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log("Setting video source");
        
        // Make sure video plays with a promise handler
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log("Video playing successfully");
                setIsScanning(true);
                setHasPermission(true);
                
                // Mock successful scan after a few seconds
                setTimeout(() => {
                  if (isScanning) {
                    stopScanner();
                    mockSuccessfulScan();
                  }
                }, 5000);
              })
              .catch(err => {
                console.error("Error playing video:", err);
                setCameraError("Failed to play camera feed: " + err.message);
              });
          }
        };
      } else {
        console.error("Video reference is null");
        setCameraError("Video element not available");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      setCameraError(error instanceof Error ? error.message : "Unknown camera error");
      toast({
        title: "Camera access failed",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      });
    }
  };
  
  const stopScanner = () => {
    console.log("Stopping scanner");
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => {
        console.log("Stopping track:", track.kind);
        track.stop();
      });
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
  
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <Card className="w-full max-w-md mb-4">
        <CardContent className="p-4 sm:p-6">
          <div className="relative aspect-square w-full bg-black rounded-lg overflow-hidden mb-4">
            {isScanning ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* QR code alignment guides */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-[40px] h-[40px] border-l-4 border-t-4 border-white opacity-80"></div>
                  <div className="absolute top-0 right-0 w-[40px] h-[40px] border-r-4 border-t-4 border-white opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-l-4 border-b-4 border-white opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-r-4 border-b-4 border-white opacity-80"></div>
                  
                  {/* Center alignment box */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border-2 border-dashed border-white opacity-60 rounded-lg"></div>
                  
                  {/* Scanning animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand-purple animate-pulse"></div>
                </div>
                
                {/* Scan status indicator */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 px-3 text-white text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <span>Scanning for QR code...</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-900 text-center">
                {hasPermission === false ? (
                  <div className="text-center p-4">
                    <CameraOff className="h-16 w-16 text-red-400 mx-auto mb-3" />
                    <p className="text-white">Camera access denied</p>
                    <p className="text-gray-400 text-sm mt-1">Please enable camera permissions in your browser settings</p>
                  </div>
                ) : cameraError ? (
                  <div className="text-center p-4">
                    <CameraOff className="h-16 w-16 text-red-400 mx-auto mb-3" />
                    <p className="text-white">Camera error</p>
                    <p className="text-gray-400 text-sm mt-1">{cameraError}</p>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-white">Press the button below to activate camera</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            {isScanning ? (
              <Button onClick={stopScanner} variant="outline" className="w-full sm:w-auto mb-2">
                <CameraOff className="h-4 w-4 mr-2" /> Stop Scanner
              </Button>
            ) : (
              <Button onClick={startScanner} className="w-full sm:w-auto mb-2">
                <Scan className="h-4 w-4 mr-2" /> Start Scanner
              </Button>
            )}
            
            <p className={`mt-2 text-sm ${isScanning ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
              {isScanning 
                ? "Position the QR code within the box"
                : "Scan any QR code on garment tags or displays"
              }
            </p>
          </div>
        </CardContent>
      </Card>
      
      {isScanning && (
        <div className="w-full max-w-md p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Scanning Tips:</h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Ensure good lighting for better results</li>
            <li>• Hold your device steady</li>
            <li>• Position the QR code within the dashed box</li>
            <li>• Make sure the entire QR code is visible</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
