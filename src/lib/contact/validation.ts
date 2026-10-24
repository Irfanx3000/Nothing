import { z } from "zod";

export const serviceOptions = [
  "Web Development",
  "Mobile Application",
  "Automation & Integrations",
  "Custom Software",
  "Technical Support",
  "Not sure yet",
] as const;
export const budgetOptions = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure"] as const;
export const timelineOptions = ["ASAP", "1 – 3 months", "3 – 6 months", "Flexible"] as const;

const optional = <T extends readonly [string, ...string[]]>(opts: T) =>
  z.union([z.enum(opts), z.literal("")]).optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { error: "Choose a service" }),
  message: z.string().trim().min(20, "Tell us a little more (20+ characters)").max(3000),
  budget: optional(budgetOptions),
  timeline: optional(timelineOptions),
  // Spam protection: honeypot must stay empty; form must take > 3s to fill.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult =
  | { ok: true }
  | { ok: false; code: "invalid" | "not_configured" | "delivery_failed"; message: string; fieldErrors?: Record<string, string> };
