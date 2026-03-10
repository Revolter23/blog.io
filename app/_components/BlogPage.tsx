import singleBlog from "@/app/_lib/singleBlog";
import type { Blog } from "@/app/_lib/definitions";
import Image from "next/image";
import { Suspense } from "react";

export default async function BlogPage({ id }: { id: string }) {
	// console.log(id);
	const data = await singleBlog(id!);

	// console.log("BlogPage data:", data);
	const blog: Blog = data;

	return (
		<div className="grow overflow-auto p-8">
			<article className="bg-white rounded-lg overflow-hidden">
				{/* Hero Image */}
				<Image
					src={blog.coverImage}
					alt={blog.title}
					width={1920}
					height={1080}
					className="w-full h-96 object-cover"
				/>

				<div className="p-6">
					<span className="text-violet-700 text-[0.85rem] font-medium">
						{blog.category[0]}
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
