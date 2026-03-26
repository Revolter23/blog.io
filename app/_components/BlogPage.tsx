import type { Blog, BlogImage } from "@/app/_lib/definitions";
import Image from "next/image";
import db from "@/src/index";
import { blogsTable, blogImages } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export default async function BlogPage({ id }: { id: string }) {
	// console.log(id);
	const data = await db
		.select()
		.from(blogsTable)
		.innerJoin(blogImages, eq(blogsTable.coverImage, blogImages.imageId))
		.where(eq(blogsTable.blogId, id));

	// console.log(data);
	const blog: Blog = data[0].blogs;
	const image: BlogImage = data[0].blog_images;

	return (
		<div className="grow overflow-auto p-8">
			<article className="bg-white rounded-lg overflow-hidden min-h-200">
				{/* Hero Image */}
				<Image
					src={image.imageUrl}
					alt={blog.title}
					width={1920}
					height={1080}
					className="w-full bg-gray-200 h-96 object-cover"
				/>

				<div className="p-6">
					<span className="text-violet-700 text-[0.85rem] font-medium">
						{blog.categories[0]}
					</span>

					{/* Title */}
					<h1 className="text-4xl font-bold mt-8 mb-4">
						{blog.title}
					</h1>

					{/* Content */}
					<div className="prose prose-lg max-w-none mb-12">
						{blog.content}
					</div>
				</div>
			</article>
		</div>
	);
}
