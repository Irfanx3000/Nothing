import type { ContactInput } from "./validation";

/**
 * Server-only email delivery. Call only from inside a server function handler.
 * Configure via env (never VITE_-prefixed):
 *   CONTACT_EMAIL_PROVIDER=resend
 *   RESEND_API_KEY=...
 *   CONTACT_TO_EMAIL=you@yourdomain.com
 *   CONTACT_FROM_EMAIL="Studio <noreply@yourdomain.com>"
 * Add another provider by extending the switch below.
 */
export type DeliveryOutcome = { status: "sent" } | { status: "not_configured" } | { status: "failed"; detail: string };

export async function deliverContactEmail(data: ContactInput): Promise<DeliveryOutcome> {
  const provider = process.env["CONTACT_EMAIL_PROVIDER"];
  const to = process.env["CONTACT_TO_EMAIL"];
  const from = process.env["CONTACT_FROM_EMAIL"];
  if (!provider || !to || !from) return { status: "not_configured" };

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Business: ${data.business || "—"}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget || "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    "",
    data.message,
  ].join("\n");

  switch (provider) {
    case "resend": {
      const key = process.env["RESEND_API_KEY"];
      if (!key) return { status: "not_configured" };
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `New enquiry: ${data.service} — ${data.name}`, text }),
      });
      if (!res.ok) return { status: "failed", detail: `${res.status} ${await res.text()}` };
      return { status: "sent" };
    }
    default:
      return { status: "not_configured" };
  }
}
