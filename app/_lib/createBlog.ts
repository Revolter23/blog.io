import axios from "axios";

export default async function allBlogs(data: {
	id: string;
	image: string;
	title: string;
	description: string;
	content: string;
	category: string[];
	date: string;
}) {
	const baseURL =
		import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

	try {
		const response = await axios.post(`${baseURL}/blogs`, data);
		return response.data;
	} catch (error) {
		console.error("Error fetching blogs:", error);
		throw error;
	}
}
