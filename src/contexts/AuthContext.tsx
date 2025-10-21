import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthDialog: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  triggerAuth: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export useAuth hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('luckyai-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('luckyai-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hardcoded credentials check
    if (email === 'krishna@gmail.com' && password === '123123') {
      const newUser: User = {
        id: 'user_krishna',
        email: 'krishna@gmail.com',
        fullName: 'Krishna'
      };
      setUser(newUser);
      localStorage.setItem('luckyai-user', JSON.stringify(newUser));
      setShowAuthDialog(false);
    } else {
      throw new Error('Invalid credentials. Use krishna@gmail.com with password 123123');
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (fullName && email && password.length >= 8) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        fullName
      };
      setUser(newUser);
      localStorage.setItem('luckyai-user', JSON.stringify(newUser));
      setShowAuthDialog(false);
    } else {
      throw new Error('Invalid data');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luckyai-user');
  };

  const triggerAuth = () => {
    if (!user) {
      setShowAuthDialog(true);
    }
  };

  const closeAuthDialog = () => {
    // Allow closing dialog even if not authenticated
    setShowAuthDialog(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      showAuthDialog,
      login,
      signup,
      logout,
      triggerAuth,
      closeAuthDialog
    }}>
      {children}
    </AuthContext.Provider>
  );
};