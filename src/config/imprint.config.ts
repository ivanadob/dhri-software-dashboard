import { createUrl } from "@acdh-oeaw/lib";

import { env } from "@/config/env.config";

export function createImprintUrl(): URL {
	return createUrl({
		baseUrl: "https://imprint.acdh.oeaw.ac.at",
		pathname: `/${String(env.PUBLIC_REDMINE_ID)}`,
	});
}
