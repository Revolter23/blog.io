import "dotenv/config";
import db from "@/src/index";
import fs from "fs/promises";
import { blogImages, blogsTable } from "@/src/db/schema";
import { blogs } from "@/db.json";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/app/_lib/s3";

async function seed() {
	console.log("Seeding...");

	const imageDir = path.join(process.cwd(), "public", "images");

	for (const blog of blogs) {
		// 1. Extract filename from URL
		const name = blog.coverImage.split("/").at(-1) ?? "image";

		// 2. Fetch image from URL
		const filePath = path.join(imageDir, name);

		// 3. Convert to Buffer
		const bytes = await fs.readFile(filePath);
		const buffer = Buffer.from(bytes);

		// // 4. Get mime type from response headers
		const mimeType = name.endsWith(".png") ? "image/png" : "image/jpeg";

		const fileName = `BlogImages/${Date.now()}-${name}`;

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
				name,
				mimeType,
				imageUrl: url,
			})
			.returning({ id: blogImages.imageId });

		// // 6. Insert blog row with imageId
		await db.insert(blogsTable).values({
			title: blog.title,
			categories: blog.category,
			description: blog.description,
			content: blog.content,
			coverImage: insertedImage.id,
		});

		console.log(`Seeded blog: "${blog.title}"`);
	}

	console.log("Done!");
	process.exit(0);
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
