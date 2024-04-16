// import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
// import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
// import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
	adapter: node({
		mode: "standalone",
	}),
	base: env.PUBLIC_APP_BASE_PATH,
	integrations: [
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: ["*"],
			},
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
		// keystatic(),
		// mdx(),
		// react(),
		sitemap(),
	],
	output: "hybrid",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	server: {
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
});
