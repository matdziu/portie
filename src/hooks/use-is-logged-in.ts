"use client";

import { typedFetch } from "@/lib/typed-fetch";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingUserSession, setIsCheckingUserSession] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      try {
        const isLoggedIn = await typedFetch<boolean>("/auth/is-logged-in");
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingUserSession(false);
      }
    }

    checkUserSession();
  }, []);

  return { isLoggedIn, isCheckingUserSession };
};
