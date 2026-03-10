import SideNav from "@/app/_components/SideNav";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<section className="flex justify-center items-center h-56">
				<article className="flex flex-col justify-center items-center gap-2">
					<h1 className="text-4xl font-bold">Blog.io</h1>
					<p className="text-gray-600 text-xl">
						Welcome to the Blog.io page!
					</p>
				</article>
			</section>
			<div className="flex h-screen bg-gray-100">
				<SideNav />
				{children}
			</div>
		</>
	);
}
