import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import RideBooking from '@/components/RideBooking';
import MapView from '@/components/MapView';
import RideHistory from '@/components/RideHistory';
import UserProfile from '@/components/UserProfile';
import { Car, MapPin, Zap, Shield, Clock, Star } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('book');

  const renderContent = () => {
    switch (activeTab) {
      case 'book':
        return <RideBooking />;
      case 'track':
        return <MapView />;
      case 'history':
        return <RideHistory />;
      case 'profile':
        return <UserProfile />;
      default:
        return <RideBooking />;
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Get a ride in seconds with our smart matching algorithm"
    },
    {
      icon: Shield,
      title: "Safe & Secure", 
      description: "All drivers verified with real-time safety features"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your driver's location and arrival time live"
    },
    {
      icon: Star,
      title: "Top-rated Drivers",
      description: "Ride with the highest-rated drivers in your area"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/80"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="mb-8 animate-float">
            <Car className="h-16 w-16 mx-auto mb-6 text-white drop-shadow-lg" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Your Ride,
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              On Demand
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg max-w-2xl mx-auto">
            Book rides instantly, track in real-time, and travel safely with our premium ride-sharing service
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="hero"
              className="text-lg px-8 py-4 h-auto"
              onClick={() => setActiveTab('book')}
            >
              <Car className="h-5 w-5 mr-2" />
              Book Your Ride Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-primary"
              onClick={() => setActiveTab('track')}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Track Live
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-4 z-40 flex justify-center px-4">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="py-8 px-4 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Features Section (shown only on book tab) */}
      {activeTab === 'book' && (
        <section className="py-16 px-4 bg-gradient-to-br from-accent to-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Service?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of transportation with our cutting-edge features and unmatched service quality
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-2xl shadow-md hover:shadow-elevated transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
