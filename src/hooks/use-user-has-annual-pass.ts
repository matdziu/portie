"use client";

import { typedFetch } from "@/lib/typed-fetch";
import { useEffect, useState } from "react";

export const useUserHasAnnualPass = () => {
  const [hasAnnualPass, setHasAnnualPass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnnualPassStatus = async () => {
      try {
        const hasAnnualPass = await typedFetch<boolean>(
          "/payments/user-has-annual-pass"
        );
        setHasAnnualPass(hasAnnualPass);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnualPassStatus();
  }, []);

  return { hasAnnualPass, isLoading, error };
};
