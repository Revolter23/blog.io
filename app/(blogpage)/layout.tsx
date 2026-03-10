import Navbar from "@/app/_components/Navbar";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
		</>
	);
}
