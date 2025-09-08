"use client";

import { CurrentUserHasAnnualPassResult } from "@/domain/payments/entities/current-user-has-annual-pass-result";
import { typedFetch } from "@/lib/typed-fetch";
import { useEffect, useState } from "react";

export const useUserHasAnnualPass = () => {
  const [hasAnnualPassResult, setHasAnnualPassResult] =
    useState<CurrentUserHasAnnualPassResult>({ hasAnnualPass: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnnualPassStatus = async () => {
      try {
        const hasAnnualPassResult =
          await typedFetch<CurrentUserHasAnnualPassResult>(
            "/payments/user-has-annual-pass"
          );
        setHasAnnualPassResult(hasAnnualPassResult);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnualPassStatus();
  }, []);

  return {
    hasAnnualPass: hasAnnualPassResult.hasAnnualPass,
    annualPassExpirationDate: hasAnnualPassResult.annualPassExpirationDate,
    isLoading,
    error,
  };
};
