import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Car, Users, Zap, TrendingUp } from 'lucide-react';
import { usePricing } from '@/contexts/PricingContext';
import { useTracking } from '@/contexts/TrackingContext';
import { useAuth } from '@/contexts/AuthContext';

// This will be replaced by dynamic pricing

const RideBooking = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRideId, setSelectedRideId] = useState('economy');
  const [isSearching, setIsSearching] = useState(false);
  const [distance, setDistance] = useState(0);
  
  const { pricingTiers, currentMultiplier, calculatePrice, getPriceBreakdown } = usePricing();
  const { startTracking } = useTracking();
  const { user } = useAuth();

  // Calculate distance when both locations are provided
  useEffect(() => {
    if (pickup && destination) {
      // Simulate distance calculation - in real app, this would use a mapping service
      const simulatedDistance = Math.random() * 20 + 2; // 2-22 km
      setDistance(simulatedDistance);
    }
  }, [pickup, destination]);

  const selectedRide = pricingTiers.find(tier => tier.id === selectedRideId) || pricingTiers[0];
  const currentPrice = calculatePrice(distance, selectedRideId);
  const priceBreakdown = getPriceBreakdown(distance, selectedRideId);

  const handleBookRide = () => {
    if (!user) {
      alert('Please login to book a ride');
      return;
    }

    setIsSearching(true);
    
    // Simulate booking process
    setTimeout(() => {
      // Start real-time tracking
      const pickupLocation = { lat: 40.7128, lng: -74.0060 }; // Mock coordinates
      const destinationLocation = { lat: 40.7589, lng: -73.9851 }; // Mock coordinates
      
      startTracking(pickupLocation, destinationLocation);
      setIsSearching(false);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elevated border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center">Book Your Ride</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-secondary" />
            <Input
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Ride Types */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground">Choose your ride</h3>
            {currentMultiplier > 1.0 && (
              <div className="flex items-center gap-1 text-orange-600 text-sm">
                <TrendingUp className="h-3 w-3" />
                <span>{currentMultiplier.toFixed(1)}x surge</span>
              </div>
            )}
          </div>
          {pricingTiers.map((ride) => {
            const ridePrice = calculatePrice(distance, ride.id);
            const isSelected = selectedRideId === ride.id;
            
            return (
              <div
                key={ride.id}
                onClick={() => setSelectedRideId(ride.id)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    isSelected ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <span className="text-lg">{ride.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium">{ride.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.floor(Math.random() * 5) + 2} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {ride.capacity}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${ridePrice.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs">
                    {distance > 0 ? `${distance.toFixed(1)} km` : 'Estimated'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBookRide}
          disabled={!pickup || !destination || isSearching}
          variant="hero"
          size="lg"
          className="w-full h-14 text-base"
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Finding your driver...
            </div>
          ) : (
            `Book ${selectedRide.name} • $${currentPrice.toFixed(2)}`
          )}
        </Button>

        {/* Fare Breakdown */}
        {pickup && destination && distance > 0 && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Fare breakdown</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base fare</span>
                <span>${priceBreakdown.baseFare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance ({distance.toFixed(1)} km)</span>
                <span>${priceBreakdown.distanceFare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>${priceBreakdown.serviceFee.toFixed(2)}</span>
              </div>
              {priceBreakdown.surgeMultiplier > 1.0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Surge pricing ({priceBreakdown.surgeMultiplier.toFixed(1)}x)</span>
                  <span>+${((priceBreakdown.surgeMultiplier - 1) * (priceBreakdown.baseFare + priceBreakdown.distanceFare + priceBreakdown.serviceFee)).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-1 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RideBooking;