import { z } from "zod";
// src/lib/contact/validation.ts
var serviceOptions = [
	"Web Development",
	"Mobile Application",
	"Automation & Integrations",
	"Custom Software",
	"Technical Support",
	"Not sure yet"
];
var budgetOptions = [
	"Under $2k",
	"$2k – $5k",
	"$5k – $15k",
	"$15k+",
	"Not sure"
];
var timelineOptions = [
	"ASAP",
	"1 – 3 months",
	"3 – 6 months",
	"Flexible"
];
var optional = (opts) => z.union([z.enum(opts), z.literal("")]).optional();
var contactSchema = z.object({
	name: z.string().trim().min(2, "Please enter your full name").max(100),
	email: z.string().trim().email("Enter a valid email address").max(255),
	business: z.string().trim().max(120).optional().or(z.literal("")),
	service: z.enum(serviceOptions, { error: "Choose a service" }),
	message: z.string().trim().min(20, "Tell us a little more (20+ characters)").max(3e3),
	budget: optional(budgetOptions),
	timeline: optional(timelineOptions),
	website: z.string().max(0).optional().or(z.literal("")),
	startedAt: z.number()
});
export { timelineOptions as i, contactSchema as n, serviceOptions as r, budgetOptions as t };
