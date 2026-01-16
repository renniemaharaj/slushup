import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getAsset } from "../utils/assetRouter";

type AlbumKey = "all" | "bars" | "drinks" | "moments";

type GalleryItem = {
	id: string;
	src: string;
	alt: string;
};

const BAR_ITEMS: GalleryItem[] = [
	{
		id: "bar-1",
		src: getAsset("barImage"),
		alt: "Professional bar setup at event",
	},
	{
		id: "bar-2",
		src: getAsset("barImage2"),
		alt: "Elegant bar setup with drinks",
	},
	{
		id: "bar-3",
		src: getAsset("barImage3"),
		alt: "Modern bar setup with lighting",
	},
];

const DRINK_ITEMS: GalleryItem[] = [
	{
		id: "cheers",
		src: getAsset("cheersWide"),
		alt: "Cheers moment with guests",
	},
	{
		id: "drink-1",
		src: getAsset("drinkImageWatermelon"),
		alt: "Refreshing watermelon drink",
	},
	{
		id: "drink-yellow",
		src: getAsset("drinkImageYellow"),
		alt: "Vibrant yellow cocktail",
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
	{
		id: "signage",
		src: getAsset("signageImagePurple"),
		alt: "SlushUp branded signage",
	},
	{
		id: "drink-green",
		src: getAsset("drinkImageGreen"),
		alt: "Vibrant green cocktail",
	},
	{
		id: "drink-baby-lucas-signage",
		src: getAsset("drinksImageBabyLucasSignage"),
		alt: "Baby Lucas SlushUp signage",
	},
	{
		id: "drink-many",
		src: getAsset("drinksImageMany"),
		alt: "Variety of SlushUp drinks",
	},
];

const MOMENT_ITEMS: GalleryItem[] = [
	{
		id: "moment-1",
		src: getAsset("barImageWithPeople"),
		alt: "Professional bar setup at event",
	},
	{
		id: "people-1",
		src: getAsset("peopleImage1"),
		alt: "Guests enjoying drinks at event",
	},
	{
		id: "people-2",
		src: getAsset("peopleImage2"),
		alt: "Guests enjoying drinks at event",
	},
	{
		id: "people-3",
		src: getAsset("peopleImage3"),
		alt: "Guests enjoying drinks at event",
	},
];

const albums = [
	{ key: "all", label: "All" },
	{ key: "bars", label: "Bars" },
	{ key: "drinks", label: "Drinks" },
	{ key: "moments", label: "Moments" },
] as const;

const albumTitles: Record<AlbumKey, string> = {
	all: "Moments We Create",
	bars: "Our Bar Setups",
	drinks: "Signature Drinks",
	moments: "Event Moments",
};

const albumPreviewCount: Record<AlbumKey, number> = {
	all: 3,
	bars: 3,
	drinks: 4,
	moments: 2,
};

const getAlbumFromURL = (): AlbumKey => {
	if (typeof window === "undefined") return "all";
	const album = new URLSearchParams(window.location.search).get("album");
	return album === "bars" || album === "drinks" || album === "moments"
		? album
		: "all";
};

const setAlbumInURL = (album: AlbumKey) => {
	const params = new URLSearchParams(window.location.search);
	if (album === "all") params.delete("album");
	else params.set("album", album);
	window.history.replaceState(null, "", `?${params.toString()}`);
};

export function Gallery() {
	const [activeAlbum, setActiveAlbum] = useState<AlbumKey>(getAlbumFromURL);
	const [showAll, setShowAll] = useState(false);

	const itemsForAlbum = useMemo(() => {
		switch (activeAlbum) {
			case "bars":
				return BAR_ITEMS;
			case "drinks":
				return DRINK_ITEMS;
			case "moments":
				return MOMENT_ITEMS;
			default:
				return [...BAR_ITEMS, ...DRINK_ITEMS, ...MOMENT_ITEMS];
		}
	}, [activeAlbum]);

	const isWide = (src: string) => src.toLowerCase().includes("wide");

	const wideItems = itemsForAlbum.filter((item) => isWide(item.src));
	const verticalItems = itemsForAlbum.filter((item) => !isWide(item.src));

	const visibleVerticalItems = showAll
		? verticalItems
		: verticalItems.slice(0, albumPreviewCount[activeAlbum]);

	return (
		<section id="gallery" className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<p className="text-slushup-green text-sm font-medium uppercase mb-3">
						Gallery
					</p>

					<AnimatePresence mode="wait">
						<motion.h2
							key={activeAlbum}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
							className="text-4xl sm:text-5xl font-bold text-slushup-text mb-6"
						>
							{albumTitles[activeAlbum]}
						</motion.h2>
					</AnimatePresence>
				</div>

				<div className="flex justify-center gap-2 mb-12 flex-wrap relative">
					{albums.map((album) => {
						const isActive = activeAlbum === album.key;

						return (
							<button
								key={album.key}
								type="button"
								onClick={() => {
									setActiveAlbum(album.key);
									setAlbumInURL(album.key);
									setShowAll(false);
								}}
								className="relative px-5 py-2 text-sm font-medium text-slushup-green"
							>
								{album.label}

								{isActive && (
									<motion.span
										layoutId="album-underline"
										className="absolute left-0 right-0 -bottom-1 h-0.5 bg-slushup-green rounded"
									/>
								)}
							</button>
						);
					})}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeAlbum}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.35 }}
					>
						{wideItems.length > 0 && (
							<div className="space-y-8 mb-16">
								{wideItems.map((item) => (
									<div
										key={item.id}
										className="relative h-64 sm:h-80 lg:h-[26rem] rounded-3xl overflow-hidden shadow-sm"
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

						<div className="relative">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
								<AnimatePresence initial={false}>
									{visibleVerticalItems.map((item, idx) => (
										<motion.div
											key={item.id}
											layout
											initial={{ opacity: 0, scale: 0.96 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.96 }}
											transition={{ duration: 0.25, delay: idx * 0.04 }}
											className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group"
										>
											<img
												src={item.src}
												alt={item.alt}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
												loading="lazy"
											/>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
										</motion.div>
									))}
								</AnimatePresence>
							</div>

							<AnimatePresence>
								{!showAll &&
									verticalItems.length > albumPreviewCount[activeAlbum] && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="absolute inset-x-0 bottom-0 pt-32 bg-gradient-to-t from-slushup-green/15 to-transparent flex justify-center pointer-events-none"
										>
											<button
												type="button"
												onClick={() => setShowAll(true)}
												className="pointer-events-auto mb-6 px-8 py-4 rounded-lg bg-slushup-green text-white font-semibold shadow-lg"
											>
												See More Items
											</button>
										</motion.div>
									)}
							</AnimatePresence>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
