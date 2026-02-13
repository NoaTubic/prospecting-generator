import posthog from "posthog-js";

export function initPostHog() {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY !== "phc_PLACEHOLDER"
  ) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "https://us.i.posthog.com",
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.debug();
        }
      },
    });
  }
}

export { posthog };
