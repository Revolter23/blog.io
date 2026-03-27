import { Button } from "@/components/ui/button";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex flex-row justify-between items-center px-8 py-4 border-b-2 border-gray-200">
			<Link href="/">
				<div className="flex items-center gap-4">
					<SchoolIcon
						fontSize="medium"
						className="box-content bg-violet-700 text-white p-2 rounded-xl"
					/>
					<h1 className="text-xl font-bold">Blog.io</h1>
				</div>
			</Link>
			<div className="flex gap-8 text-gray-600 font-medium">
				<Link href="#">Tools</Link>
				<Link href="#">Practice</Link>
				<Link href="#">Events</Link>
				<Link href="/blogs">All Blogs</Link>
				<Link href="#">About</Link>
			</div>
			<Link href="/new-blog">
				<Button
					variant="outline"
					className="bg-violet-700 text-white cursor-pointer transition-colors duration-300"
				>
					New Blog
				</Button>
			</Link>
		</nav>
	);
}
