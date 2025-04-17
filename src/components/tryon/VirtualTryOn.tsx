
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface Garment {
  id: string;
  name: string;
  image: string;
}

const VirtualTryOn = () => {
  const [garment, setGarment] = useState<Garment | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get garment and user photo from localStorage
    const storedGarment = localStorage.getItem('selectedGarment');
    const storedPhoto = localStorage.getItem('userPhoto');
    
    if (storedGarment) {
      setGarment(JSON.parse(storedGarment));
    }
    
    if (storedPhoto) {
      setUserPhoto(storedPhoto);
    }
    
    // Mock loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDownload = () => {
    toast({
      title: "Image downloaded",
      description: "The image has been saved to your device.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share option",
      description: "Sharing functionality would be implemented here.",
    });
  };

  const tryAnotherItem = () => {
    navigate('/scan-qr');
  };

  if (!garment || !userPhoto) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-lg font-medium text-gray-600">
          Missing garment or photo information. Please start over.
        </p>
        <Button onClick={() => navigate('/scan-qr')} className="mt-4">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{garment.name}</h3>
          <p className="text-sm text-muted-foreground">Virtual Try-On Result</p>
        </div>
        
        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-6">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <RefreshCw className="h-8 w-8 text-brand-purple animate-spin mb-2" />
                <p className="text-sm font-medium text-gray-600">Generating try-on...</p>
              </div>
            </div>
          ) : (
            // This is a mock implementation that overlays the garment image on top of the user photo
            // In a real application, an ML model would create a proper composite image
            <div className="relative w-full h-full">
              {/* User photo as background */}
              <img 
                src={userPhoto} 
                alt="User" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Semi-transparent garment overlay to simulate try-on */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={garment.image} 
                  alt={garment.name}
                  className="w-[80%] h-auto max-h-[80%] object-contain opacity-80"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-4 px-3">
                <p className="text-white text-sm font-medium">
                  {garment.name} - Virtual Try-On
                </p>
              </div>
            </div>
          )}
        </div>
        
        {!isLoading && (
          <>
            <div className="flex justify-between gap-3 mb-4">
              <Button onClick={handleDownload} variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <Button onClick={tryAnotherItem} className="w-full">
              Try Another Item
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualTryOn;
