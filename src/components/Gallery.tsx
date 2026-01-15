import { getAsset } from "../utils/assetRouter";

export function Gallery() {
	const galleryItems = [
		{
			id: "bar-1",
			type: "image" as const,
			src: getAsset("barImageWithPeople"),
			alt: "Professional bar setup at event",
		},
		{
			id: "drinks-1",
			type: "image" as const,
			src: getAsset("drinkImageWatermelon"),
			alt: "Refreshing watermelon drink",
		},
		{
			id: "cheers",
			type: "image" as const,
			src: getAsset("cheersWide"),
			alt: "Cheers moment with guests",
		},
		{
			id: "bar-2",
			type: "image" as const,
			src: getAsset("barImageWithPeople2"),
			alt: "Bar in action at event",
		},
		{
			id: "drink-yellow",
			type: "image" as const,
			src: getAsset("drinkImageYellow"),
			alt: "Vibrant yellow cocktail",
		},
		{
			id: "signage",
			type: "image" as const,
			src: getAsset("cheersSignage"),
			alt: "SlushUp branded signage",
		},
	];

	return (
		<section className="max-w-6xl mx-auto px-4 py-12 md:py-20 bg-white">
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold text-slushup-green mb-4">
					Moments We Create
				</h2>
				<p className="text-xl text-slushup-text max-w-2xl mx-auto">
					Beautiful memories from real SlushUp events
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{galleryItems.map((item) => (
					<div
						key={item.id}
						className="relative h-64 md:h-72 bg-slushup-cream rounded-xl overflow-hidden group cursor-pointer"
					>
						<img
							src={item.src}
							alt={item.alt}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
					</div>
				))}
			</div>
		</section>
	);
}
