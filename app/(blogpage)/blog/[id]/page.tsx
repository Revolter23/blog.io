import db from "@/src/index";
import type { Blog, BlogImage } from "@/app/_lib/definitions";
import { blogsTable, blogImages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function IndividualPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const data = await db
		.select()
		.from(blogsTable)
		.innerJoin(blogImages, eq(blogsTable.coverImage, blogImages.imageId))
		.where(eq(blogsTable.blogId, id));

	const blog: Blog = data[0].blogs;
	const image: BlogImage = data[0].blog_images;

	return (
		<div className="flex justify-center py-10">
			<article className="w-[50%] min-h-200">
				{/* Hero Image */}
				<Image
					src={image.imageUrl}
					alt={blog.title}
					width={1920}
					height={1080}
					className="rounded-lg w-full bg-gray-200 h-76 object-cover"
				/>

				<div className="pt-10">
					<span className="text-violet-700 text-[0.85rem] font-medium">
						{blog.categories[0]}
					</span>

					{/* Title */}
					<h1 className="text-4xl font-bold mt-4 mb-4">
						{blog.title}
					</h1>

					{/* Content */}
					<div className="leading-8 font-semibold prose prose-lg max-w-none mb-12">
						{blog.content}
					</div>
				</div>
			</article>
		</div>
	);
}
