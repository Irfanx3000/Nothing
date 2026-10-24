// Placeholder branding — replace once final details are supplied.
export const siteConfig = {
  name: "Northfold Studio",
  shortName: "Northfold",
  tagline: "Independent IT solutions studio",
  description:
    "Northfold is an independent studio designing and building websites, mobile apps, automations and custom software for growing businesses.",
  // Set VITE_SITE_URL in production; used for canonical + structured data.
  url: (import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "",
  email: "hello@example.com",
  // Digits only incl. country code, e.g. "919876543210". Empty hides the link.
  whatsapp: (import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined) ?? "",
  location: "Remote · Worldwide",
};
