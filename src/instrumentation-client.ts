// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

Sentry.init({
  dsn: "https://d034e1c4ce9b1b3386fb0203883b063b@o4509989462212608.ingest.de.sentry.io/4509989464440912",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

if (process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
  });
}
