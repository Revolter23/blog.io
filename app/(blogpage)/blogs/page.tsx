import { eq, desc } from "drizzle-orm";
import db from "@/src/index";
import { blogsTable, blogImages } from "@/src/db/schema";
import { BlogCard } from "@/app/_components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "All articles, latest first.",
};

// Revalidate every 60 seconds (ISR). Set to 0 for fully dynamic.
// export const revalidate = 60;

async function getAllBlogs() {
	return db
		.select()
		.from(blogsTable)
		.innerJoin(blogImages, eq(blogsTable.coverImage, blogImages.imageId))
		.orderBy(desc(blogsTable.createdAt)); // latest first
}

export default async function BlogsPage() {
	const allBlogs = await getAllBlogs();
	// console.log("Fetched blogs:", allBlogs);

	return (
		<main className="max-w-6xl mx-auto px-6 pb-24">
			{/* ── Header ── */}
			<header className="py-20 border-b border-stone-200 mb-16">
				<p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-700 mb-4">
					The Journal
				</p>
				<h1 className="font-serif text-7xl font-bold tracking-tight leading-none text-stone-900">
					All <em className="italic text-orange-700">Stories</em>
				</h1>
				<p className="mt-5 text-sm text-stone-400 font-light">
					{allBlogs.length}{" "}
					{allBlogs.length === 1 ? "article" : "articles"} — newest on
					top
				</p>
			</header>

			{/* ── Content ── */}
			{allBlogs.length === 0 ? (
				<div className="flex flex-col items-center gap-4 py-32 text-stone-400">
					<span className="text-3xl text-orange-700">✦</span>
					<p className="text-base">
						No articles yet. Check back soon.
					</p>
				</div>
			) : (
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
					{allBlogs.map((item, index) => (
						<BlogCard
							key={item.blogs.blogId}
							blog={item.blogs}
							image={item.blog_images}
							index={index}
						/>
					))}
				</section>
			)}
		</main>
	);
}
