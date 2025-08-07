"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { Subscription } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingUserSession, setIsCheckingUserSession] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    let subscription: Subscription | null = null;

    async function setupAuthListener() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsCheckingUserSession(false);

      const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
        setIsLoggedIn(!!newSession);
      });
      subscription = data.subscription;
    }

    setupAuthListener();

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  return { isLoggedIn, isCheckingUserSession };
};
