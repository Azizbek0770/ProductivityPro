import React, { createContext, useContext, useEffect, useState } from 'react';

export type SubscriptionTier = 'basic' | 'standard' | 'pro';

interface SubscriptionContextProps {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTierState] = useState<SubscriptionTier>('basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('subscriptionTier');
    if (saved === 'standard' || saved === 'pro') setTierState(saved);
    setLoading(false);
  }, []);

  const setTier = (tier: SubscriptionTier) => {
    setTierState(tier);
    localStorage.setItem('subscriptionTier', tier);
  };

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
};
