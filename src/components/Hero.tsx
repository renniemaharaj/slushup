import { useEffect, useRef, useState } from "react";
import assets from "../../assetRouter.ts";
import { Navigation } from "./Navigation";

const { barVideoShort, drinkRed, drinksVideoShortPan } = assets;
const HERO_VIDEOS = [barVideoShort, drinkRed, drinksVideoShortPan];

export function Hero() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [videoIndex, setVideoIndex] = useState(0);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.src = HERO_VIDEOS[videoIndex];
		video.load();

		video.play().catch(() => {
			/* autoplay safety */
		});
	}, [videoIndex]);

	const handleEnded = () => {
		setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background video */}
			<div className="absolute inset-0 z-0">
				<video
					ref={videoRef}
					autoPlay
					muted
					playsInline
					onEnded={handleEnded}
					className="w-full h-full object-cover blur-sm transition-opacity duration-700"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-slushup-green/60 via-slushup-green/40 to-slushup-green/50" />
			</div>

			{/* Right-side compact nav */}
			<Navigation />

			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
				<p className="text-white/80 text-sm font-medium tracking-wide uppercase mb-2">
					Premium Event Beverages
				</p>

				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
					“Live The SlushUp Life”
				</h1>

				<p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
					Premium frozen treats and beverage experiences that leave your guests
					talking for years.
				</p>
			</div>
		</section>
	);
}
