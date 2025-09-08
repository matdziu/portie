"use client";

import { CurrentUserAnnualPassInfoResult } from "@/domain/payments/entities/current-user-annual-pass-info-result";
import { typedFetch } from "@/lib/typed-fetch";
import { useEffect, useState } from "react";

export const useUserAnnualPassInfo = () => {
  const [annualPassInfoResult, setAnnualPassInfoResult] =
    useState<CurrentUserAnnualPassInfoResult>({ hasAnnualPass: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnnualPassInfo = async () => {
      try {
        const hasAnnualPassResult =
          await typedFetch<CurrentUserAnnualPassInfoResult>(
            "/payments/user-annual-pass-info"
          );
        setAnnualPassInfoResult(hasAnnualPassResult);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnualPassInfo();
  }, []);

  return {
    userAnnualPassInfo: annualPassInfoResult,
    isLoading,
    error,
  };
};
