import { useState } from "react";
import { getAsset } from "../utils/assetRouter";

export function Gallery() {
	const [showAll, setShowAll] = useState(false);

	const galleryItems = [
		{
			id: "bar-1",
			src: getAsset("barImageWithPeople"),
			alt: "Professional bar setup at event",
		},
		{
			id: "drinks-1",
			src: getAsset("drinkImageWatermelon"),
			alt: "Refreshing watermelon drink",
		},
		{
			id: "cheers",
			src: getAsset("cheersWide"),
			alt: "Cheers moment with guests",
		},
		{
			id: "bar-2",
			src: getAsset("barImageWithPeople2"),
			alt: "Bar in action at event",
		},
		{
			id: "drink-yellow",
			src: getAsset("drinkImageYellow"),
			alt: "Vibrant yellow cocktail",
		},
		{
			id: "signage",
			src: getAsset("cheersSignage"),
			alt: "SlushUp branded signage",
		},
	];

	const isWide = (src: string) => src.toLowerCase().includes("wide");

	const wideItems = galleryItems.filter((item) => isWide(item.src));

	const verticalItems = galleryItems.filter((item) => !isWide(item.src));

	const visibleVerticalItems = showAll
		? verticalItems
		: verticalItems.slice(0, 2);

	return (
		<section className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
						Gallery
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Moments We Create
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-2xl mx-auto leading-relaxed">
						Real SlushUp events delivering unforgettable memories and
						experiences.
					</p>
				</div>

				{/* Wide Images */}
				{wideItems.length > 0 && (
					<div className="space-y-8 mb-16">
						{wideItems.map((item) => (
							<div
								key={item.id}
								className="relative h-64 sm:h-80 lg:h-[26rem] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
							>
								<img
									src={item.src}
									alt={item.alt}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/10" />
							</div>
						))}
					</div>
				)}

				{/* Vertical Grid + See More */}
				<div className="relative">
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
						{visibleVerticalItems.map((item) => (
							<div
								key={item.id}
								className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
							>
								<img
									src={item.src}
									alt={item.alt}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
							</div>
						))}
					</div>

					{!showAll && verticalItems.length > 4 && (
						<div className="absolute inset-x-0 bottom-0 pt-32 bg-gradient-to-t from-slushup-green/15 via-slushup-green/5 to-transparent flex justify-center pointer-events-none">
							<button
								type="button"
								onClick={() => setShowAll(true)}
								className="pointer-events-auto mb-6 px-6 py-3 rounded-full bg-slushup-green/90 text-white font-medium shadow-lg hover:bg-slushup-green transition"
							>
								See more moments
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
