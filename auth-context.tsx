// auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession, signIn, signOut, authClient } from "@/lib/auth-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "userSession";
const TOKEN_KEY = "authToken";

interface AuthContextType {
  session: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
    userType: "PATIENT" | "DOCTOR"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem(SESSION_KEY);
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (storedToken && authClient.setToken) {
          authClient.setToken(storedToken);
        }
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          // Validate session (must have user and userType)
          if (
            parsedSession &&
            parsedSession.user &&
            parsedSession.user.userType
          ) {
            setSession(parsedSession);
            setIsAuthenticated(true);
          } else {
            setSession(null);
            setIsAuthenticated(false);
            await AsyncStorage.removeItem(SESSION_KEY);
          }
        } else {
          setSession(null);
          setIsAuthenticated(false);
        }
      } catch (e) {
        setSession(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: "PATIENT" | "DOCTOR"
  ) => {
    await signIn.email(
      { email, password, userType },
      {
        onSuccess: async () => {
          const sess = await getSession();
       
          // Extract the token from the correct path
          const token = sess?.data?.session?.token;
          if (token) {
            await AsyncStorage.setItem(TOKEN_KEY, token);
            if (authClient.setToken) {
              authClient.setToken(token);
            }
          }
          // Save the whole data object (user + session)
          await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sess?.data));
          setSession(sess?.data);
          setIsAuthenticated(true);
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  const logout = async () => {
    await signOut();
    setSession(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
  };

  if (loading) {
    // Optionally, you can return a splash/loading screen here
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
