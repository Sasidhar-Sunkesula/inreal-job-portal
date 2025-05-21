import { useState } from "react";
import { API_URL } from "../constants";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types";

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const updateProfile = async (profileData: {
    name: string;
    location: string;
    experience: number;
    skills: string[];
    preference: User["preference"];
  }) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      
      if (setUser) {
        setUser(data.user);
      }
      
      return data.user;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile: user,
    loading,
    updateProfile,
  };
}
