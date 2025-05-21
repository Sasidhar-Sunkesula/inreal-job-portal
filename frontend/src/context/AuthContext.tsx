import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { ROUTES } from "../constants/routes";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string, 
    email: string, 
    password: string, 
    location: string, 
    experience: number, 
    skills: string[], 
    preference: User["preference"]
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setUser(data.user);
      toast.success("Login successful");
      navigate(ROUTES.Home);
    } catch {
      toast.error("Unexpected error, please try again");
    } finally {
      setLoading(false);
    }
  }

  async function signup(
    name: string, 
    email: string, 
    password: string, 
    location: string, 
    experience: number, 
    skills: string[], 
    preference: User["preference"]
  ) {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          location, 
          experience, 
          skills, 
          preference 
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setUser(data.user);
      toast.success("Signup successful");
    } catch {
      toast.error("Unexpected error, please try again");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setUser(null);
      // refresh the page
      window.location.reload();
      toast.success("Logout successful");
    } catch {
      toast.error("Unexpected error, please try again");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/user`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setUser(data.user);
      } catch (error) {
        if (error instanceof Error) {
          // Only show toast if it's not a 401 error (unauthorized)
          if (error.message !== "Unauthorized") {
            toast.error(error.message);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
