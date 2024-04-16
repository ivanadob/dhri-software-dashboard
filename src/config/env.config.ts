import { log } from "@acdh-oeaw/lib";
import { createEnv } from "@acdh-oeaw/validate-env";
import * as v from "valibot";

export const env = createEnv({
	prefix: "PUBLIC_",
	shared(input) {
		const Schema = v.object({
			NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "production"),
		});
		return v.parse(Schema, input);
	},
	server(input) {
		const Schema = v.object({
			ENV_VALIDATION: v.optional(v.picklist(["disabled", "enabled"])),
			KEYSTATIC_GITHUB_CLIENT_ID: v.optional(v.string([v.minLength(1)])),
			KEYSTATIC_GITHUB_CLIENT_SECRET: v.optional(v.string([v.minLength(1)])),
			KEYSTATIC_SECRET: v.optional(v.string([v.minLength(1)])),
		});
		return v.parse(Schema, input);
	},
	client(input) {
		const Schema = v.object({
			PUBLIC_APP_BASE_PATH: v.optional(v.string([v.minLength(1)])),
			PUBLIC_APP_BASE_URL: v.string([v.url()]),
			PUBLIC_BOTS: v.optional(v.picklist(["disabled", "enabled"])),
			PUBLIC_GOOGLE_SITE_VERIFICATION: v.optional(v.string()),
			PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: v.optional(v.string([v.minLength(1)])),
			PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: v.optional(v.string([v.minLength(1)])),
			PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: v.optional(v.string([v.minLength(1)])),
			PUBLIC_KEYSTATIC_MODE: v.optional(v.picklist(["github", "local"]), "local"),
			PUBLIC_MATOMO_BASE_URL: v.optional(v.string([v.url()])),
			PUBLIC_MATOMO_ID: v.optional(v.coerce(v.number([v.integer(), v.minValue(1)]), Number)),
			PUBLIC_REDMINE_ID: v.coerce(v.number([v.integer(), v.minValue(1)]), Number),
		});
		return v.parse(Schema, input);
	},
	environment: import.meta.env as Record<string, unknown>,
	skip: import.meta.env.ENV_VALIDATION === "disabled",
	onError(error) {
		if (error instanceof v.ValiError) {
			const message = "Invalid environment variables";

			log.error(`${message}:`, v.flatten(error).nested);

			const validationError = new Error(message);
			delete validationError.stack;

			throw validationError;
		}

		throw error;
	},
});
