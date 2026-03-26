import CardWrapper from "./CardWrapper";
import type { Blog } from "@/app/_lib/definitions";
import Link from "next/link";
import db from "@/src/index";
import { blogsTable } from "@/src/db/schema";
import { desc } from "drizzle-orm";

export default async function SideNav() {
	const data = await db
		.select()
		.from(blogsTable)
		.orderBy(desc(blogsTable.createdAt))
		.limit(5);
	return (
		<div className="flex flex-col flex-none gap-4 w-[30%] p-6 overflow-auto">
			<p className="pb-2 font-medium">Latest Articles</p>
			{data.map((blog: Blog) => (
				<Link key={blog.blogId} href={`/${blog.blogId}`}>
					<CardWrapper key={blog.blogId} blog={blog} />
				</Link>
			))}
		</div>
	);
}
