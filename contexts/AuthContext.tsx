import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our authentication context
interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signIn: (phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize authentication state and Supabase connection
  React.useEffect(() => {
    // Here we would initialize Supabase Auth and set up listeners
    
    // For now, we'll just simulate loading and no user
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sign in with phone number (to be implemented with Supabase)
  const signIn = async (phoneNumber: string) => {
    try {
      // Here we would call Supabase auth.signInWithOtp
      console.log(`Sign in with phone: ${phoneNumber}`);
      
      // For now, just simulate a successful login
      setUser({ id: '123', phone: phoneNumber });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  // Sign out (to be implemented with Supabase)
  const signOut = async () => {
    try {
      // Here we would call Supabase auth.signOut
      console.log('Sign out');
      
      // Clear the user
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};