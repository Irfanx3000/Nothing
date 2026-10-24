import { createServerFn } from "@tanstack/react-start";
import { contactSchema, type ContactResult } from "./validation";
import { deliverContactEmail } from "./emailProvider";

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ContactResult> => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
      return { ok: false, code: "invalid", message: "Please check the highlighted fields.", fieldErrors };
    }
    // Honeypot filled or submitted implausibly fast: pretend nothing happened
    // without sending anything.
    if (parsed.data.website || Date.now() - parsed.data.startedAt < 3000) {
      return { ok: false, code: "invalid", message: "Submission blocked. Please try again." };
    }
    const outcome = await deliverContactEmail(parsed.data);
    if (outcome.status === "sent") return { ok: true };
    if (outcome.status === "not_configured") {
      return { ok: false, code: "not_configured", message: "Online enquiries aren't connected yet. Please email us directly." };
    }
    console.error("Contact delivery failed:", outcome.detail);
    return { ok: false, code: "delivery_failed", message: "We couldn't send your message. Please try again or email us directly." };
  });
