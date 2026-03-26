// app/images/[id]/route.ts
import db from "@/src/index";
import { BlogImage } from "@/app/_lib/definitions";
import { images } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const data = await db
		.select()
		.from(images)
		.where(eq(images.imageId, params.id));

	const image: BlogImage = data[0];

	if (!image) return new Response("Not found", { status: 404 });

	return new Response(image.data, {
		headers: {
			"Content-Type": image.mimeType, // e.g. "image/jpeg"
		},
	});
}
