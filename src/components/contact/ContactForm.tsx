import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { FormField, fieldClass } from "./FormField";
import { Button } from "@/components/ui/ActionButton";
import { budgetOptions, contactSchema, serviceOptions, timelineOptions } from "@/lib/contact/validation";
import { submitContact } from "@/lib/contact/contact.functions";
import { siteConfig } from "@/config/site";

type Status = { state: "idle" | "loading" | "success" } | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(fd.entries()), startedAt: startedAt.current };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const i of parsed.error.issues) fe[String(i.path[0])] ??= i.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    setStatus({ state: "loading" });
    try {
      const res = await submitContact({ data: parsed.data });
      if (res.ok) setStatus({ state: "success" });
      else {
        if (res.fieldErrors) setErrors(res.fieldErrors);
        setStatus({ state: "error", message: res.message });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-page-line p-8 sm:p-12">
        <CheckCircle2 className="h-10 w-10 text-moss" aria-hidden />
        <h3 className="text-big font-semibold">Thanks — message received.</h3>
        <p className="text-page-muted">We'll reply within two working days.</p>
      </div>
    );
  }

  const err = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <FormField id="name" label="Full name" error={errors["name"]}>
        <input id="name" name="name" autoComplete="name" required className={fieldClass} {...err("name")} />
      </FormField>
      <FormField id="email" label="Email address" error={errors["email"]}>
        <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} {...err("email")} />
      </FormField>
      <FormField id="business" label="Business name" optional error={errors["business"]}>
        <input id="business" name="business" autoComplete="organization" className={fieldClass} />
      </FormField>
      <FormField id="service" label="Service required" error={errors["service"]}>
        <select id="service" name="service" required defaultValue="" className={fieldClass} {...err("service")}>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </FormField>
      <div className="sm:col-span-2">
        <FormField id="message" label="Project description" error={errors["message"]}>
          <textarea id="message" name="message" rows={5} required placeholder="What are you building, and what does success look like?" className={fieldClass} {...err("message")} />
        </FormField>
      </div>
      <FormField id="budget" label="Budget range" optional>
        <select id="budget" name="budget" defaultValue="" className={fieldClass}>
          <option value="">Prefer not to say</option>
          {budgetOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </FormField>
      <FormField id="timeline" label="Expected timeline" optional>
        <select id="timeline" name="timeline" defaultValue="" className={fieldClass}>
          <option value="">Not decided</option>
          {timelineOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </FormField>
      {/* Honeypot — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="text-sm">
          {status.state === "error" && (
            <p className="text-destructive">
              {status.message} <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>
            </p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={status.state === "loading"}>
          {status.state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send enquiry <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></>}
        </Button>
      </div>
    </form>
  );
}
