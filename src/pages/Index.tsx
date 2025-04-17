
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/layout/Navbar';
import { CameraIcon, ScanIcon, ShirtIcon, UserIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="gradient-bg py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Virtual Try-On Experience
                </h1>
                <p className="text-white/90 text-lg mb-8">
                  Try clothes virtually before you buy. Simply scan a QR code, upload your photo, and see how it looks on you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-2">
                      <img 
                        src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2626&auto=format&fit=crop"
                        alt="Virtual Try-On Demo" 
                        className="rounded-md w-full aspect-[3/4] object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 p-3 rounded-full">
                          <ShirtIcon className="h-8 w-8 text-brand-purple" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-brand-light-purple rounded-full flex items-center justify-center animate-pulse">
                    <ScanIcon className="h-10 w-10 text-brand-purple" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 bg-brand-light-purple rounded-full flex items-center justify-center mb-4">
                <ScanIcon className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
              <p className="text-gray-600">
                Find a QR code on a garment tag or display and scan it with the app
              </p>
            </div>
            
            <div className="text-center flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-brand-light-purple rounded-full flex items-center justify-center mb-4">
                <CameraIcon className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Photo</h3>
              <p className="text-gray-600">
                Take a full-body photo or upload an existing one from your gallery
              </p>
            </div>
            
            <div className="text-center flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-brand-light-purple rounded-full flex items-center justify-center mb-4">
                <ShirtIcon className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See the Result</h3>
              <p className="text-gray-600">
                Get an instant visualization of how the garment looks on you
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try It Yourself?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Create an account to start using our virtual try-on feature and revolutionize your shopping experience
          </p>
          <Button asChild size="lg">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <ShirtIcon className="h-6 w-6 text-brand-purple" />
                <span className="text-xl font-bold">VirtualFit</span>
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} VirtualFit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
