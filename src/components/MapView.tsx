import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, MessageCircle, Star, Clock, DollarSign, Car } from 'lucide-react';
import { useTracking } from '@/contexts/TrackingContext';
import { usePricing } from '@/contexts/PricingContext';
import carIcon from '@/assets/car-icon.jpg';

const MapView = () => {
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 20 });
  const [isMoving, setIsMoving] = useState(true);
  
  const { currentRide, isTracking, stopTracking, updateRideStatus } = useTracking();
  const { currentMultiplier } = usePricing();

  // Update driver position based on real-time tracking
  useEffect(() => {
    if (currentRide?.driver.location) {
      // Convert lat/lng to percentage for display
      const lat = currentRide.driver.location.lat;
      const lng = currentRide.driver.location.lng;
      
      // Simple conversion for demo purposes
      const x = ((lng + 74.1) / 0.1) * 100; // NYC area
      const y = ((40.8 - lat) / 0.1) * 100;
      
      setDriverPosition({
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y))
      });
    }
  }, [currentRide?.driver.location]);

  // Simulate driver movement when no real tracking
  useEffect(() => {
    if (!isMoving || currentRide) return;
    
    const interval = setInterval(() => {
      setDriverPosition(prev => ({
        x: Math.max(20, Math.min(80, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.max(20, Math.min(80, prev.y + (Math.random() - 0.5) * 10))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isMoving, currentRide]);

  const driverInfo = currentRide ? {
    name: currentRide.driver.name,
    rating: currentRide.driver.rating,
    car: `${currentRide.driver.vehicle.make} ${currentRide.driver.vehicle.model}`,
    plate: currentRide.driver.vehicle.plate,
    eta: `${currentRide.estimatedArrival} min`,
    phone: "+1 (555) 123-4567",
    status: currentRide.status,
    speed: currentRide.driver.speed
  } : {
    name: "John Smith",
    rating: 4.9,
    car: "Honda Civic",
    plate: "ABC-123",
    eta: "2 min",
    phone: "+1 (555) 123-4567",
    status: "searching",
    speed: 0
  };

  return (
    <div className="relative h-[500px] w-full max-w-md mx-auto">
      {/* Map Container */}
      <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden border border-border shadow-elevated">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Pickup Location */}
        <div className="absolute top-[30%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-primary text-white p-2 rounded-full shadow-lg animate-pulse-glow">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <Badge variant="default" className="text-xs">Pickup</Badge>
          </div>
        </div>

        {/* Destination */}
        <div className="absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-secondary text-white p-2 rounded-full shadow-lg">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <Badge variant="secondary" className="text-xs">Destination</Badge>
          </div>
        </div>

        {/* Status Indicator */}
        {currentRide && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    driverInfo.status === 'searching' ? 'bg-yellow-500 animate-pulse' :
                    driverInfo.status === 'found' ? 'bg-blue-500 animate-pulse' :
                    driverInfo.status === 'arriving' ? 'bg-orange-500 animate-pulse' :
                    driverInfo.status === 'in_progress' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`} />
                  <span className="text-sm font-medium capitalize">
                    {driverInfo.status.replace('_', ' ')}
                  </span>
                </div>
                {currentMultiplier > 1.0 && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    {currentMultiplier.toFixed(1)}x surge
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Driver Car */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-in-out"
          style={{ 
            left: `${driverPosition.x}%`, 
            top: `${driverPosition.y}%` 
          }}
        >
          <div className="relative">
            <div className={`p-2 rounded-full shadow-lg border-2 animate-float ${
              currentRide ? 'bg-white border-primary' : 'bg-white border-primary'
            }`}>
              <img src={carIcon} alt="Driver car" className="h-6 w-6" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge className="text-xs bg-white text-primary border border-primary">
                {driverInfo.eta} away
              </Badge>
            </div>
            {driverInfo.speed > 0 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <Badge variant="outline" className="text-xs">
                  {Math.round(driverInfo.speed)} km/h
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(211 85% 45%)" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="hsl(144 75% 50%)" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <path
            d="M 25% 30% Q 50% 10% 75% 70%"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Driver Info Card */}
      <Card className="absolute bottom-4 left-4 right-4 shadow-elevated border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                {driverInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold">{driverInfo.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {driverInfo.rating}
                </div>
                <p className="text-sm text-muted-foreground">
                  {driverInfo.car} • {driverInfo.plate}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="h-4 w-4 text-primary" />
                <span className="font-medium">Driver arriving in {driverInfo.eta}</span>
              </div>
              {!currentRide && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setIsMoving(!isMoving)}
                  className="text-xs"
                >
                  {isMoving ? 'Pause' : 'Resume'} simulation
                </Button>
              )}
            </div>
            
            {currentRide && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Distance: {currentRide.distance.toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Fare: ${currentRide.price.toFixed(2)}</span>
                </div>
              </div>
            )}
            
            {currentRide && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateRideStatus('cancelled')}
                  className="flex-1 text-xs"
                >
                  Cancel Ride
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={stopTracking}
                  className="flex-1 text-xs"
                >
                  End Tracking
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;