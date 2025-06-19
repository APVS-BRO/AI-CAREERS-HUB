
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this for prod (e.g. 0.1–0.2)
  tracesSampleRate: 1.0,

  // ← no routingInstrumentation here any more
  integrations: [
    Sentry.browserTracingIntegration({
      // You can still use beforeNavigate or beforeStartSpan if you need
      // beforeNavigate: ctx => { /* rename transaction etc */ },
    }),
  ],

  // Which fetch/XHR requests should get spans
  tracePropagationTargets: [
    "localhost", 
    /^\https:\/\/yourserver\.io\/api/,
  ],
});
