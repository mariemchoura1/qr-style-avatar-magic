import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, Camera, CameraOff, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
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
      
      if (!videoRef.current) {
        console.error("Video reference is null - waiting for DOM to update");
        setTimeout(() => {
          if (videoRef.current) {
            attachStreamToVideo(stream);
          } else {
            throw new Error("Video element not available after waiting");
          }
        }, 100);
      } else {
        attachStreamToVideo(stream);
      }
    } catch (error) {
      handleCameraError(error);
    }
  };
  
  const attachStreamToVideo = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      console.log("Video element exists, setting source object");
      
      videoRef.current.onloadedmetadata = () => {
        console.log("Video metadata loaded");
        if (videoRef.current) {
          videoRef.current.play()
            .then(() => {
              console.log("Video playing successfully");
              setIsScanning(true);
              setHasPermission(true);
              
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
      setCameraError("Video element not available");
      console.error("Video reference is still null after attempting to set stream");
    }
  };
  
  const handleCameraError = (error: unknown) => {
    console.error('Error accessing camera:', error);
    setHasPermission(false);
    const errorMessage = error instanceof Error ? error.message : "Unknown camera error";
    setCameraError(errorMessage);
    toast({
      title: "Camera access failed",
      description: "Please allow camera access to scan QR codes.",
      variant: "destructive",
    });
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
    
    localStorage.setItem('selectedGarment', JSON.stringify({
      id: 'denim-jacket-123',
      name: 'Blue Denim Jacket',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=2574&auto=format&fit=crop'
    }));
    
    navigate('/upload-photo');
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedImageUrl = event.target?.result as string;
        setUploadedImage(uploadedImage);
        
        setTimeout(() => {
          mockSuccessfulScan();
        }, 1000);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file.",
        variant: "destructive"
      });
    }
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
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-[40px] h-[40px] border-l-4 border-t-4 border-white opacity-80"></div>
                  <div className="absolute top-0 right-0 w-[40px] h-[40px] border-r-4 border-t-4 border-white opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-l-4 border-b-4 border-white opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-r-4 border-b-4 border-white opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border-2 border-dashed border-white opacity-60 rounded-lg"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand-purple animate-pulse"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 px-3 text-white text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <span>Scanning for QR code...</span>
                  </div>
                </div>
              </>
            ) : uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Uploaded QR Code" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-center p-4">
                <Camera className="h-16 w-16 text-gray-400 mb-3" />
                <p className="text-white">Scan or Upload QR Code</p>
                <p className="text-gray-400 text-sm mt-1">
                  Choose from camera scan or upload an image
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            {isScanning ? (
              <Button onClick={stopScanner} variant="outline" className="w-full sm:w-auto mb-2">
                <CameraOff className="h-4 w-4 mr-2" /> Stop Scanner
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button onClick={startScanner} className="w-full sm:w-auto mb-2">
                  <Scan className="h-4 w-4 mr-2" /> Start Camera Scan
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <Button 
                  variant="secondary" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full sm:w-auto mb-2"
                >
                  <Upload className="h-4 w-4 mr-2" /> Upload Image
                </Button>
              </div>
            )}
            
            <p className={`mt-2 text-sm ${isScanning ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
              {isScanning 
                ? "Position the QR code within the box"
                : "Scan or upload a QR code on garment tags"
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
      
      {cameraError && (
        <Alert variant="destructive" className="w-full max-w-md mt-4">
          <AlertTitle>Camera Error</AlertTitle>
          <AlertDescription>
            {cameraError}
            <div className="mt-2 text-sm">
              Please make sure your browser has camera permissions enabled and try again.
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default QRScanner;
