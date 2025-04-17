
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, RefreshCw, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const PhotoUpload = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedPhoto) return;
    
    setIsLoading(true);
    
    // Mock upload process
    setTimeout(() => {
      setIsLoading(false);
      
      // Store the photo in localStorage
      localStorage.setItem('userPhoto', selectedPhoto);
      
      toast({
        title: "Photo uploaded successfully!",
        description: "Proceeding to virtual try-on.",
      });
      
      navigate('/try-on');
    }, 2000);
  };

  const handleRetake = () => {
    setSelectedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-full max-w-md aspect-square bg-gray-100 rounded-lg overflow-hidden mb-6">
          {selectedPhoto ? (
            <img 
              src={selectedPhoto} 
              alt="Selected" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Camera className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500 text-center">Upload a photo of yourself</p>
              <p className="text-gray-400 text-sm text-center mt-1">
                For best results, use a full-body photo against a plain background
              </p>
            </div>
          )}
        </div>

        {selectedPhoto ? (
          <div className="flex gap-3">
            <Button onClick={handleRetake} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Retake
            </Button>
            <Button onClick={handleUpload} className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" /> Continue
                </>
              )}
            </Button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" /> Upload Photo
            </Button>
          </div>
        )}
        
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Your photo will be used only for the virtual try-on and won't be saved on our servers
        </p>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
