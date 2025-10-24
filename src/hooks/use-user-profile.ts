'use client';

import { UserProfileType } from "@/types/user-profile";
import { useEffect, useState } from "react";

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`/api/user/profile`);
        console.log("User profile response:", response);
        if (!response.ok) {
          setError("Failed to fetch user profile");
          return;
        }
        const data = await response.json() as UserProfileType;
        console.log("Fetched user profile:", data);
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
      }
    }

    fetchUserProfile();
  }, []);
  return { userProfile, error };
}