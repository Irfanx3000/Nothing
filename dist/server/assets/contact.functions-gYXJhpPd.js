import { a as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-CnGYgseA.js";
import { n as contactSchema } from "./validation-BwYvtDrt.js";
// node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// src/lib/contact/emailProvider.ts
async function deliverContactEmail(data) {
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
		data.message
	].join("\n");
	switch (provider) {
		case "resend": {
			const key = process.env["RESEND_API_KEY"];
			if (!key) return { status: "not_configured" };
			const res = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${key}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					from,
					to: [to],
					reply_to: data.email,
					subject: `New enquiry: ${data.service} — ${data.name}`,
					text
				})
			});
			if (!res.ok) return {
				status: "failed",
				detail: `${res.status} ${await res.text()}`
			};
			return { status: "sent" };
		}
		default: return { status: "not_configured" };
	}
}
// src/lib/contact/contact.functions.ts?tss-serverfn-split
var submitContact_createServerFn_handler = createServerRpc({
	id: "4b1aae7945862957fe97466ef16978584ba0f687eb4729a1989e4f8a57959af3",
	name: "submitContact",
	filename: "src/lib/contact/contact.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((input) => input).handler(submitContact_createServerFn_handler, async ({ data }) => {
	const parsed = contactSchema.safeParse(data);
	if (!parsed.success) {
		const fieldErrors = {};
		for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
		return {
			ok: false,
			code: "invalid",
			message: "Please check the highlighted fields.",
			fieldErrors
		};
	}
	if (parsed.data.website || Date.now() - parsed.data.startedAt < 3e3) return {
		ok: false,
		code: "invalid",
		message: "Submission blocked. Please try again."
	};
	const outcome = await deliverContactEmail(parsed.data);
	if (outcome.status === "sent") return { ok: true };
	if (outcome.status === "not_configured") return {
		ok: false,
		code: "not_configured",
		message: "Online enquiries aren't connected yet. Please email us directly."
	};
	console.error("Contact delivery failed:", outcome.detail);
	return {
		ok: false,
		code: "delivery_failed",
		message: "We couldn't send your message. Please try again or email us directly."
	};
});
export { submitContact_createServerFn_handler };
