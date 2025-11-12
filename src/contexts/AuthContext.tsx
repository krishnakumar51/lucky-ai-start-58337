import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

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
  const { user: clerkUser, isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();

  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    fullName: clerkUser.fullName || clerkUser.firstName || 'User'
  } : null;

  const login = async (email: string, password: string) => {
    // Clerk handles login via openSignIn
    openSignIn();
  };

  const signup = async (fullName: string, email: string, password: string) => {
    // Clerk handles signup via openSignIn
    openSignIn();
  };

  const logout = async () => {
    await signOut();
  };

  const triggerAuth = () => {
    if (!isSignedIn) {
      openSignIn();
    }
  };

  const closeAuthDialog = () => {
    // Clerk manages its own dialog
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!isSignedIn,
      showAuthDialog: false,
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