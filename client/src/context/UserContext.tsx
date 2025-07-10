import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { nanoid } from 'nanoid';

export type UserTier = 'basic' | 'standard' | 'pro';

interface UserContextType {
  userTier: UserTier;
  setUserTier: (tier: UserTier) => void;
  inviteCount: number;
  setInviteCount: (count: number) => void;
  referralCode: string;
  upgradeUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userTier, setUserTier] = useState<UserTier>('basic');
  const [inviteCount, setInviteCount] = useState<number>(0);
  const [referralCode] = useState<string>(() => {
    const stored = localStorage.getItem('referralCode');
    return stored || nanoid(8);
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedTier = localStorage.getItem('userTier') as UserTier;
    const storedInviteCount = localStorage.getItem('inviteCount');
    const storedReferralCode = localStorage.getItem('referralCode');
    
    if (storedTier) {
      setUserTier(storedTier);
    }
    if (storedInviteCount) {
      setInviteCount(parseInt(storedInviteCount));
    }
    if (!storedReferralCode) {
      localStorage.setItem('referralCode', referralCode);
    }
  }, [referralCode]);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('userTier', userTier);
    localStorage.setItem('inviteCount', inviteCount.toString());
  }, [userTier, inviteCount]);

  const upgradeUser = () => {
    if (inviteCount >= 5) {
      setUserTier('pro');
    } else if (inviteCount >= 2) {
      setUserTier('standard');
    }
  };

  // Auto-upgrade based on invites
  useEffect(() => {
    upgradeUser();
  }, [inviteCount]);

  const handleSetInviteCount = (count: number) => {
    setInviteCount(count);
  };

  return (
    <UserContext.Provider
      value={{
        userTier,
        setUserTier,
        inviteCount,
        setInviteCount: handleSetInviteCount,
        referralCode,
        upgradeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
