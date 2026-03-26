"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/src/index";
import { z } from "zod";
import { s3 } from "@/app/_lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { blogImages, blogsTable } from "@/src/db/schema";

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
		.instanceof(File, { message: "Cover image is required" })
		.refine((file) => file.size > 0, "File is empty")
		.refine((file) => file.size <= 10 * 1024 * 1024, "Max size is 10MB")
		.refine(
			(file) =>
				["image/jpeg", "image/png", "image/webp"].includes(file.type),
			"Only .jpg, .png, .webp allowed",
		),
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
		coverImage: formData.get("coverImage") as File,
	};

	const result = BlogSchema.safeParse(raw);

	if (!result.success) {
		return {
			errors: result.error.flatten()
				.fieldErrors as BlogFormState["errors"],
			values: {
				title: raw.title,
				description: raw.description,
				content: raw.content,
			},
		};
	}

	// TODO: persist to your database here
	const fileName = `BlogImages/${Date.now()}-${(raw.coverImage as File).name}`;

	const bytes: ArrayBuffer = await raw.coverImage.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const mimeType = (raw.coverImage as File).type;

	try {
		await s3.send(
			new PutObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME!,
				Key: fileName,
				Body: buffer,
				ContentType: mimeType,
			}),
		);

		const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

		// // 5. Insert image row
		const [insertedImage] = await db
			.insert(blogImages)
			.values({
				name: fileName,
				mimeType,
				imageUrl: url,
			})
			.returning({ id: blogImages.imageId });

		// // 6. Insert blog row with imageId
		await db.insert(blogsTable).values({
			title: raw.title,
			description: raw.description,
			content: raw.content,
			coverImage: insertedImage.id,
		});
	} catch (error) {
		console.error("Error occurred while submitting blog:", error);
	}

	revalidatePath("/");
	redirect("/");
}
