import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserTier = 'free' | 'pro' | 'premium';

interface UserContextType {
  userTier: UserTier;
  setUserTier: (tier: UserTier) => void;
  inviteCount: number;
  setInviteCount: (count: number) => void;
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
  const [userTier, setUserTier] = useState<UserTier>('free');
  const [inviteCount, setInviteCount] = useState<number>(0);

  return (
    <UserContext.Provider
      value={{
        userTier,
        setUserTier,
        inviteCount,
        setInviteCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
