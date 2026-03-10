import axios from "axios";

export function getTimeAgo(dateString: string): string {
	const now = new Date();
	const publishedDate = new Date(dateString);
	const diffMs = now.getTime() - publishedDate.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffWeeks = Math.floor(diffDays / 7);
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffDays / 365);

	if (diffYears > 0) {
		return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
	} else if (diffMonths > 0) {
		return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
	} else if (diffWeeks > 0) {
		return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
	} else if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	} else if (diffMins > 0) {
		return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
	} else if (diffSecs > 0) {
		return `${diffSecs} second${diffSecs > 1 ? "s" : ""} ago`;
	} else {
		return "just now";
	}
}

export async function datalength() {
	const response = await axios.get("api/blogs");
	return response.data.length;
}
