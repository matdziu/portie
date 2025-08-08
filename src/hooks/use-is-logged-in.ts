"use client";

import { typedFetch } from "@/lib/typed-fetch";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingUserSession, setIsCheckingUserSession] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      try {
        const session = await typedFetch<Session>("/auth/user-session");
        setIsLoggedIn(!!session);
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
