import axios from "axios";

export default async function allBlogs() {
	const baseURL = process.env.BASE_URL || "http://localhost:3000/";
	try {
		const response = await axios.get(baseURL + "/api/blogs");
		return response.data;
	} catch (error) {
		console.error("Error fetching blogs:", error);
		throw error;
	}
}
