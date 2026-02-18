
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  phoneNumber: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved auth state in localStorage
    const savedUser = localStorage.getItem('pasumai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string): Promise<void> => {
    // Simulate API call for sending OTP
    console.log(`Sending OTP to ${phoneNumber}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Simulate OTP verification
    console.log(`Verifying OTP: ${otp}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, any 4-digit OTP works
        if (otp.length === 4) {
          const mockUser = {
            id: '123456',
            name: 'Test Farmer',
            phoneNumber: '9876543210',
          };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('pasumai_user', JSON.stringify(mockUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pasumai_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        verifyOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
