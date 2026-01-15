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
		<section className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16 sm:mb-20">
					<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
						Gallery
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Moments We Create
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-2xl mx-auto leading-relaxed">
						Real SlushUp events delivering unforgettable memories and experiences.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{galleryItems.map((item) => (
						<div
							key={item.id}
							className="relative h-64 md:h-72 lg:h-80 bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
						>
							<img
								src={item.src}
								alt={item.alt}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
