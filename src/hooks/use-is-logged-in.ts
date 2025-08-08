"use client";

import getUserSessionAction from "@/server-actions/auth/get-user-session-action";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingUserSession, setIsCheckingUserSession] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      const { session } = await getUserSessionAction();
      setIsLoggedIn(!!session);
      setIsCheckingUserSession(false);
    }

    checkUserSession();
  }, []);

  return { isLoggedIn, isCheckingUserSession };
};
