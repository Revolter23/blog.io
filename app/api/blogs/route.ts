import { promises as fs } from "fs";
import path from "path";

export async function GET() {
	// build absolute path to the json file
	const filePath = path.join(process.cwd(), "db.json");

	try {
		const file = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(file);
		const blogs = data?.blogs ?? [];

		return new Response(JSON.stringify(blogs), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		console.error("Error reading blogs from db.json:", err);
		return new Response(JSON.stringify({ error: "Failed to load blogs" }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}

export async function POST(req: Request) {
	const filePath = path.join(process.cwd(), "db.json");

	try {
		const body = await req.json();

		// simple validation – require at least a title and content
		if (!body.title || !body.content) {
			return new Response(
				JSON.stringify({ error: "title and content are required" }),
				{
					status: 400,
					headers: { "content-type": "application/json" },
				},
			);
		}

		const file = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(file);
		const blogs = data?.blogs ?? [];

		// generate a new id if none provided
		const lastId = blogs.length
			? parseInt(blogs[blogs.length - 1].id, 10) || 0
			: 0;
		const newBlog = {
			id: body.id ?? String(lastId + 1),
			...body,
			date: body.date ?? new Date().toISOString(),
			category: body.category ?? ["TECH", "NEWS"],
		};

		blogs.push(newBlog);

		await fs.writeFile(
			filePath,
			JSON.stringify({ blogs }, null, 2),
			"utf8",
		);

		return new Response(JSON.stringify(newBlog), {
			status: 201,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		console.error("Error writing new blog to db.json:", err);
		return new Response(JSON.stringify({ error: "Failed to save blog" }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}
