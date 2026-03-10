export default function Loading() {
	return (
		<div className="grow overflow-auto p-8">
			<article className="bg-white rounded-lg overflow-hidden">
				{/* hero image skeleton */}
				<div className="w-full h-96 bg-gray-300" />

				<div className="p-6 space-y-6">
					{/* category / title skeleton */}
					<div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />

					{/* paragraph skeletons */}
					<div className="space-y-4">
						<div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
						<div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
						<div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
					</div>
				</div>
			</article>
		</div>
	);
}
