import { collection, config, fields } from "@keystatic/core";

import { Logo } from "@/components/logo";
import { env } from "@/config/env.config";

export default config({
	ui: {
		brand: {
			name: "ACDH-CH",
			// @ts-expect-error `ReactNode` is a valid return type.
			mark: Logo,
		},
	},
	storage:
		/**
		 * @see https://keystatic.com/docs/github-mode
		 */
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	collections: {
		software: collection({
			label: "Software",
			path: "./src/content/software/*",
			slugField: "title",
			format: { contentField: "content" },
			entryLayout: "form",
			columns: ["title"],
			schema: {
				title: fields.slug({
					name: {
						label: "Title",
						description: "Project title",
						validation: { isRequired: true },
					},
				}),
				repo: fields.text({
					label: "Repo",
					description: "Code repository",
					validation: { isRequired: true },
				}),
				summary: fields.text({
					label: "Summary",
					description: "Short description",
					validation: { isRequired: true },
				}),
				url: fields.url({
					label: "URL",
					description: "Project website",
					validation: { isRequired: false },
				}),
				demo: fields.url({
					label: "Demo",
					description: "Demo website",
					validation: { isRequired: false },
				}),
				content: fields.mdx({
					extension: "md",
					label: "Content",
					description: "Project description",
				}),
			},
		}),
	},
});
