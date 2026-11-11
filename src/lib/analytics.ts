import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

export const analyticsEnabled = Boolean(key);

export function initAnalytics() {
  if (!key) return;
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    // Surfaces clicks on things that look clickable but aren't (media, cards).
    capture_dead_clicks: true,
  });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;
  posthog.capture(name, properties);
}

export { posthog };
