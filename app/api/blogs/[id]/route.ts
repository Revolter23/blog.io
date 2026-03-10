import { promises as fs } from "fs";
import path from "path";
import type { Blog } from "@/app/_lib/definitions";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	// extract id from url parameter
	const { id } = await params;

	if (!id) {
		return new Response(
			JSON.stringify({ error: "id parameter is required" }),
			{
				status: 400,
				headers: { "content-type": "application/json" },
			},
		);
	}

	// build absolute path to the json file
	const filePath = path.join(process.cwd(), "db.json");

	try {
		const file = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(file);
		const blogs = data?.blogs ?? [];

		// find blog by id
		const blog = blogs.find((b: Blog) => b.id === id);

		if (!blog) {
			return new Response(JSON.stringify({ error: "Blog not found" }), {
				status: 404,
				headers: { "content-type": "application/json" },
			});
		}

		return new Response(JSON.stringify(blog), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		console.error("Error reading blog from db.json:", err);
		return new Response(JSON.stringify({ error: "Failed to load blog" }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}
