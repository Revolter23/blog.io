import BlogPage from "@/app/_components/BlogPage";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <BlogPage id={id} />;
}
