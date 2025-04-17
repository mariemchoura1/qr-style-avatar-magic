
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '../components/layout/Navbar';
import { Scan, Image, Shirt } from 'lucide-react';

const Dashboard = () => {
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
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Virtual Try-On</h1>
            <p className="text-gray-500">
              Scan a QR code to virtually try on clothes
            </p>
          </header>

          <div className="grid gap-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>
                  Follow these simple steps to use our virtual try-on feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-light-purple text-brand-purple font-medium">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Scan the QR Code</h3>
                      <p className="text-gray-500 text-sm">
                        Find a QR code on a garment tag or display and scan it with the app
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-light-purple text-brand-purple font-medium">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Upload Your Photo</h3>
                      <p className="text-gray-500 text-sm">
                        Take a full-body photo or upload an existing one
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-light-purple text-brand-purple font-medium">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">See Your Virtual Try-On</h3>
                      <p className="text-gray-500 text-sm">
                        Our system will generate a realistic preview of how the garment looks on you
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/scan-qr')} 
                className="flex-1 h-16 gap-3"
              >
                <Scan className="h-5 w-5" />
                <span>Scan QR Code</span>
              </Button>
              <Button 
                onClick={() => navigate('/try-on')} 
                variant="outline" 
                className="flex-1 h-16 gap-3"
              >
                <Shirt className="h-5 w-5" />
                <span>View Recent Try-Ons</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
