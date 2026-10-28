import { t as renderErrorPage } from "../server.js";
import { n as createCsrfMiddleware, r as createMiddleware } from "./server-CnGYgseA.js";
import { isPromise } from "@tanstack/router-core";
// node_modules/@tanstack/start-client-core/dist/esm/createStart.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
function dedupeOptions(options) {
	if (options.serializationAdapters) {
		const deduped = /* @__PURE__ */ new Set();
		dedupeSerializationAdapters(deduped, options.serializationAdapters);
		options.serializationAdapters = Array.from(deduped);
	}
	return options;
}
var createStart = (getOptions) => {
	return {
		getOptions: () => {
			const options = getOptions();
			return isPromise(options) ? Promise.resolve(options).then(dedupeOptions) : dedupeOptions(options);
		},
		createMiddleware
	};
};
// src/start.ts
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var startInstance = createStart(() => ({ requestMiddleware: [errorMiddleware, csrfMiddleware] }));
export { startInstance };
