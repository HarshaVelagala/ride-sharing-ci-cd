import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface PricingTier {
  id: string;
  name: string;
  baseRate: number;
  perKmRate: number;
  multiplier: number;
  capacity: number;
  icon: string;
}

interface PricingContextType {
  pricingTiers: PricingTier[];
  currentMultiplier: number;
  calculatePrice: (distance: number, tierId: string) => number;
  getPriceBreakdown: (distance: number, tierId: string) => {
    baseFare: number;
    distanceFare: number;
    serviceFee: number;
    surgeMultiplier: number;
    total: number;
  };
  updateSurgePricing: () => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [pricingTiers] = useState<PricingTier[]>([
    {
      id: 'economy',
      name: 'RideEconomy',
      baseRate: 2.5,
      perKmRate: 1.8,
      multiplier: 1.0,
      capacity: 4,
      icon: '🚗'
    },
    {
      id: 'comfort',
      name: 'RideComfort',
      baseRate: 3.5,
      perKmRate: 2.2,
      multiplier: 1.0,
      capacity: 4,
      icon: '🚙'
    },
    {
      id: 'xl',
      name: 'RideXL',
      baseRate: 4.5,
      perKmRate: 2.8,
      multiplier: 1.0,
      capacity: 6,
      icon: '🚐'
    }
  ]);

  // Simulate surge pricing changes
  useEffect(() => {
    const updateSurgePricing = () => {
      // Simulate random surge pricing between 1.0x and 2.5x
      const newMultiplier = 1.0 + Math.random() * 1.5;
      setCurrentMultiplier(newMultiplier);
    };

    // Update every 30 seconds
    const interval = setInterval(updateSurgePricing, 30000);
    
    // Initial update
    updateSurgePricing();

    return () => clearInterval(interval);
  }, []);

  const calculatePrice = useCallback((distance: number, tierId: string): number => {
    const tier = pricingTiers.find(t => t.id === tierId);
    if (!tier) return 0;

    const baseFare = tier.baseRate;
    const distanceFare = distance * tier.perKmRate;
    const serviceFee = (baseFare + distanceFare) * 0.1; // 10% service fee
    const total = (baseFare + distanceFare + serviceFee) * currentMultiplier;

    return Math.round(total * 100) / 100;
  }, [pricingTiers, currentMultiplier]);

  const getPriceBreakdown = useCallback((distance: number, tierId: string) => {
    const tier = pricingTiers.find(t => t.id === tierId);
    if (!tier) {
      return {
        baseFare: 0,
        distanceFare: 0,
        serviceFee: 0,
        surgeMultiplier: 1.0,
        total: 0
      };
    }

    const baseFare = tier.baseRate;
    const distanceFare = distance * tier.perKmRate;
    const serviceFee = (baseFare + distanceFare) * 0.1;
    const subtotal = baseFare + distanceFare + serviceFee;
    const total = subtotal * currentMultiplier;

    return {
      baseFare: Math.round(baseFare * 100) / 100,
      distanceFare: Math.round(distanceFare * 100) / 100,
      serviceFee: Math.round(serviceFee * 100) / 100,
      surgeMultiplier: Math.round(currentMultiplier * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }, [pricingTiers, currentMultiplier]);

  const updateSurgePricing = useCallback(() => {
    const newMultiplier = 1.0 + Math.random() * 1.5;
    setCurrentMultiplier(newMultiplier);
  }, []);

  const value = {
    pricingTiers,
    currentMultiplier,
    calculatePrice,
    getPriceBreakdown,
    updateSurgePricing
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};
