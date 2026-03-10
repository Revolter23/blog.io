import axios from "axios";

export default async function singleBlog(id: string) {
	const baseURL = process.env.BASE_URL || "http://localhost:3001";
	try {
		const response = await axios(`${baseURL}/api/blogs/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching blog:", error);
		throw error;
	}
}
