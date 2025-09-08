import "client-only";

import { enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

export function useDateLocale() {
  const locale = useLocale();
  switch (locale) {
    case "en":
      return enUS;
    default:
      return enUS;
  }
}
