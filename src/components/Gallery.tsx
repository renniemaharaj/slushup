import { AnimatePresence, motion } from "framer-motion";
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
			id: "bar-2",
			src: getAsset("barImageWithPeople2"),
			alt: "Bar in action at event",
		},
		{
			id: "bar-3",
			src: getAsset("barImage"),
			alt: "Professional bar setup at event",
		},
		{
			id: "bar-4",
			src: getAsset("barImage2"),
			alt: "Elegant bar setup with drinks",
		},
		{
			id: "bar-5",
			src: getAsset("barImage3"),
			alt: "Modern bar setup with lighting",
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
			id: "drink-yellow",
			src: getAsset("drinkImageYellow"),
			alt: "Vibrant yellow cocktail",
		},
		{
			id: "signage",
			src: getAsset("cheersSignage"),
			alt: "SlushUp branded signage",
		},
		{
			id: "drink-2",
			src: getAsset("drinksImageCream"),
			alt: "Delicious red cocktail drink",
		},
		{
			id: "drink-3",
			src: getAsset("drinksImageSunset"),
			alt: "Colorful sunset drink",
		},
		{
			id: "drink-red-purple",
			src: getAsset("drinkImageRedPurple"),
			alt: "Red and purple cocktail drink",
		},
	];

	const isWide = (src: string) => src.toLowerCase().includes("wide");

	const wideItems = galleryItems.filter((item) => isWide(item.src));

	const verticalItems = galleryItems.filter((item) => !isWide(item.src));

	const visibleVerticalItems = showAll
		? verticalItems
		: verticalItems.slice(0, 2);

	return (
		<section id="gallery" className="bg-white py-20 sm:py-28 lg:py-32">
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
						<AnimatePresence initial={false}>
							{visibleVerticalItems.map((item, idx) => (
								<motion.div
									key={item.id}
									layout
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3, delay: idx * 0.05 }}
									className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
								>
									<img
										src={item.src}
										alt={item.alt}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					<AnimatePresence>
						{!showAll && verticalItems.length > 4 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-x-0 bottom-0 pt-32 bg-gradient-to-t from-slushup-green/15 via-slushup-green/5 to-transparent flex justify-center pointer-events-none"
							>
								<button
									type="button"
									onClick={() => setShowAll(true)}
									className="pointer-events-auto mb-6 px-8 py-4 rounded-lg bg-slushup-green text-white font-semibold shadow-lg hover:bg-slushup-green-light transition-all duration-200"
								>
									See More Moments
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
