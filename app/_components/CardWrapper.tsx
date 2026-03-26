"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Blog } from "@/app/_lib/definitions";
import { getTimeAgo } from "@/app/_lib/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function CardWrapper({ blog }: { blog: Blog }) {
	const pathname = usePathname();
	const isActive = pathname.endsWith(`/${blog.blogId}`);
	const timeAgo = getTimeAgo(blog.createdAt);

	return (
		<div className={clsx(isActive && "border-l-3 border-violet-700")}>
			<Card className="relative mx-auto w-full max-w-sm hover:shadow-lg transition-shadow">
				<CardHeader className="gap-4">
					<div className="flex justify-between items-center">
						<span className="text-violet-700 text-[0.85rem] font-medium">
							{blog.categories[0]}
						</span>
						<span className="text-gray-400 text-sm">{timeAgo}</span>
					</div>
					<CardTitle>{blog.title}</CardTitle>
					<CardDescription>{blog.description}</CardDescription>
					{blog.categories[1] && (
						<Badge variant="secondary">{blog.categories[1]}</Badge>
					)}
				</CardHeader>
			</Card>
		</div>
	);
}
