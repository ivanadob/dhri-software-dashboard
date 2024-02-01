import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.@(astro|css|ts|tsx)",
		"./src/content/**/*.@(md|mdoc|mdx)",
		"./src/layouts/**/*.@(astro|css|ts|tsx)",
		"./src/pages/**/*.@(astro|css|ts|tsx)",
	],
	plugins: [],
	theme: {
		extend: {},
	},
};

export default config;
