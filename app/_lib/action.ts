"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const BlogSchema = z.object({
	title: z
		.string()
		.min(5, "Title must be at least 5 characters")
		.max(120, "Title must be 120 characters or fewer"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters")
		.max(300, "Description must be 300 characters or fewer"),
	content: z.string().min(50, "Content must be at least 50 characters"),
	coverImage: z
		.string()
		.url("Please upload a valid image")
		.min(1, "Cover image is required"),
});

export type BlogFormState = {
	errors?: Partial<Record<keyof z.infer<typeof BlogSchema>, string[]>>;
	values?: Partial<z.infer<typeof BlogSchema>>;
	success?: boolean;
	message?: string;
};

export async function submitBlogAction(
	_prev: BlogFormState,
	formData: FormData,
): Promise<BlogFormState> {
	const raw = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		content: formData.get("content") as string,
		coverImage: formData.get("coverImage") as string,
	};

	const result = BlogSchema.safeParse(raw);

	if (!result.success) {
		return {
			errors: result.error.flatten()
				.fieldErrors as BlogFormState["errors"],
			values: raw,
		};
	}

	// TODO: persist to your database here
	console.log("Validated blog data:", result.data);
	// const response = await axios.post("/api/blogs", result.data);
	// console.log("API response:", response.data);

	// revalidatePath("/");
	// redirect("/");
}
