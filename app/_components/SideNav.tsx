import CardWrapper from "./CardWrapper";
import allBlogs from "@/app/_lib/allBlogs";
import type { Blog } from "@/app/_lib/definitions";
import Link from "next/link";

export default async function SideNav() {
	const data = await allBlogs();
	return (
		<div className="flex flex-col flex-none gap-4 w-[30%] p-6 overflow-auto">
			<p className="pb-2 font-medium">Latest Articles</p>
			{data
				.sort(
					(a: Blog, b: Blog) =>
						new Date(b.date).getTime() - new Date(a.date).getTime(),
				)
				.map((blog: Blog) => (
					<Link
						key={blog.id}
						href={`/${blog.id}`}
						className="border-l-3 border-violet-700"
					>
						<CardWrapper key={blog.id} blog={blog} />
					</Link>
				))}
		</div>
	);
}
