import { defineCollection, z } from "astro:content";

const softwareCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		/** Git repository. */
		repo: z.string().url(),
		/** Short description. */
		summary: z.string(),
		/** Project website. */
		url: z.string().url().optional(),
		/** Demo deployment. */
		demo: z.string().url().optional(),
	}),
});

export const collections = {
	software: softwareCollection,
};
