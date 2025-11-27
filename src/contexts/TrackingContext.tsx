import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
  timestamp: number;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
  location: Location;
  heading: number;
  speed: number;
}

interface Ride {
  id: string;
  driver: Driver;
  pickup: Location;
  destination: Location;
  status: 'searching' | 'found' | 'arriving' | 'in_progress' | 'completed' | 'cancelled';
  estimatedArrival: number;
  estimatedDuration: number;
  distance: number;
  price: number;
  startTime?: number;
  endTime?: number;
}

interface TrackingContextType {
  currentRide: Ride | null;
  isTracking: boolean;
  startTracking: (pickup: Location, destination: Location) => void;
  stopTracking: () => void;
  updateRideStatus: (status: Ride['status']) => void;
  getDriverLocation: () => Location | null;
  getEstimatedArrival: () => number;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null);

  // Simulate driver movement
  const simulateDriverMovement = useCallback((ride: Ride) => {
    const updateDriverLocation = () => {
      setCurrentRide(prevRide => {
        if (!prevRide || prevRide.status === 'completed' || prevRide.status === 'cancelled') {
          return prevRide;
        }

        const now = Date.now();
        const timeElapsed = (now - (prevRide.startTime || now)) / 1000; // seconds
        const progress = Math.min(timeElapsed / (prevRide.estimatedDuration * 60), 1); // 0 to 1

        // Calculate current position based on progress
        const currentLat = prevRide.pickup.lat + (prevRide.destination.lat - prevRide.pickup.lat) * progress;
        const currentLng = prevRide.pickup.lng + (prevRide.destination.lng - prevRide.pickup.lng) * progress;

        const newLocation: Location = {
          lat: currentLat,
          lng: currentLng,
          timestamp: now
        };

        // Calculate remaining time
        const remainingTime = Math.max(0, prevRide.estimatedDuration * 60 - timeElapsed);

        // Update status based on progress
        let newStatus = prevRide.status;
        if (progress < 0.1 && prevRide.status === 'searching') {
          newStatus = 'found';
        } else if (progress < 0.3 && prevRide.status === 'found') {
          newStatus = 'arriving';
        } else if (progress >= 0.3 && prevRide.status === 'arriving') {
          newStatus = 'in_progress';
        } else if (progress >= 1 && prevRide.status === 'in_progress') {
          newStatus = 'completed';
        }

        return {
          ...prevRide,
          driver: {
            ...prevRide.driver,
            location: newLocation,
            heading: Math.atan2(
              prevRide.destination.lng - prevRide.pickup.lng,
              prevRide.destination.lat - prevRide.pickup.lat
            ) * 180 / Math.PI,
            speed: progress < 1 ? 25 + Math.random() * 10 : 0 // 25-35 km/h
          },
          status: newStatus,
          estimatedArrival: Math.ceil(remainingTime / 60), // minutes
          endTime: newStatus === 'completed' ? now : undefined
        };
      });
    };

    // Update every 2 seconds
    const interval = setInterval(updateDriverLocation, 2000);
    setTrackingInterval(interval);

    return interval;
  }, []);

  const startTracking = useCallback((pickup: Location, destination: Location) => {
    // Calculate distance and estimated duration
    const distance = calculateDistance(pickup, destination);
    const estimatedDuration = Math.ceil(distance / 30); // Assume 30 km/h average speed
    const basePrice = calculateBasePrice(distance);

    // Create mock driver
    const driver: Driver = {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      vehicle: {
        make: 'Toyota',
        model: 'Camry',
        color: 'Silver',
        plate: 'ABC-123'
      },
      location: pickup,
      heading: 0,
      speed: 0
    };

    const newRide: Ride = {
      id: `ride_${Date.now()}`,
      driver,
      pickup,
      destination,
      status: 'searching',
      estimatedArrival: estimatedDuration,
      estimatedDuration,
      distance,
      price: basePrice,
      startTime: Date.now()
    };

    setCurrentRide(newRide);
    setIsTracking(true);

    // Start simulation after a short delay
    setTimeout(() => {
      simulateDriverMovement(newRide);
    }, 1000);
  }, [simulateDriverMovement]);

  const stopTracking = useCallback(() => {
    if (trackingInterval) {
      clearInterval(trackingInterval);
      setTrackingInterval(null);
    }
    setIsTracking(false);
    setCurrentRide(null);
  }, [trackingInterval]);

  const updateRideStatus = useCallback((status: Ride['status']) => {
    setCurrentRide(prevRide => {
      if (!prevRide) return prevRide;
      return { ...prevRide, status };
    });
  }, []);

  const getDriverLocation = useCallback(() => {
    return currentRide?.driver.location || null;
  }, [currentRide]);

  const getEstimatedArrival = useCallback(() => {
    return currentRide?.estimatedArrival || 0;
  }, [currentRide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [trackingInterval]);

  const value = {
    currentRide,
    isTracking,
    startTracking,
    stopTracking,
    updateRideStatus,
    getDriverLocation,
    getEstimatedArrival
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

// Helper functions
function calculateDistance(point1: Location, point2: Location): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateBasePrice(distance: number): number {
  const baseFare = 2.5;
  const perKmRate = 1.8;
  return Math.round((baseFare + (distance * perKmRate)) * 100) / 100;
}
