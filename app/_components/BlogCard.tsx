import Link from "next/link";
import type { Blog, BlogImage } from "../_lib/definitions";
import Image from "next/image";

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
}

function isNew(date: Date): boolean {
	const threeDaysAgo = new Date();
	threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
	return new Date(date) >= threeDaysAgo;
}

interface BlogCardProps {
	blog: Blog;
	image: BlogImage;
	index: number;
}

export function BlogCard({ blog, image, index }: BlogCardProps) {
	return (
		<article
			className="group bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
			style={{ animationDelay: `${index * 80}ms` }}
		>
			<Link
				href={`/blog/${blog.blogId}`}
				className="flex flex-col h-full"
			>
				{/* Cover image */}
				{image.imageUrl && (
					<div className="aspect-video overflow-hidden bg-stone-100">
						<Image
							src={image.imageUrl}
							alt={blog.title}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							width={1920}
							height={1080}
						/>
					</div>
				)}

				{/* Body */}
				<div className="flex flex-col gap-3 p-6 flex-1">
					{/* Meta row */}
					<div className="flex items-center gap-2.5 text-xs text-stone-400">
						<time dateTime={new Date(blog.createdAt).toISOString()}>
							{formatDate(blog.createdAt)}
						</time>
						{isNew(blog.createdAt) && (
							<span className="bg-orange-700 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full">
								NEW
							</span>
						)}
					</div>

					{/* Title */}
					<h2 className="font-serif text-xl font-bold leading-snug text-stone-900 group-hover:text-orange-700 transition-colors duration-200">
						{blog.title}
					</h2>

					{/* Excerpt */}
					{blog.description && (
						<p className="text-sm leading-relaxed text-stone-400 font-light line-clamp-3">
							{blog.description}
						</p>
					)}

					{/* Footer */}
					<div className="flex items-center justify-between flex-wrap gap-2.5 mt-auto pt-4 border-t border-stone-100">
						{/* Author */}
						<span className="flex items-center gap-2 text-sm font-medium text-stone-800">
							<span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-[11px] font-bold grid place-items-center shrink-0">
								PB
							</span>
							Parn Barve
						</span>

						{/* Tags */}
						{blog.categories && blog.categories.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{blog.categories.slice(0, 3).map((category) => (
									<span
										key={category}
										className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-400 group-hover:bg-orange-50 group-hover:text-orange-700 group-hover:border-transparent transition-colors duration-150"
									>
										{category}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</Link>
		</article>
	);
}
