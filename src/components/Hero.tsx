import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import assets from "../utils/assetRouter";
import { Navigation } from "./Navigation";

const HERO_VIDEOS = [
	assets.videoBarShort,
	assets.videoDrinkRed,
	assets.videoDrinksSignagePan,
];

export function Hero() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [videoIndex, setVideoIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	// Slogan scales down and moves up as user scrolls
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
	const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
	const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

	// Load and play video when index changes
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// Set the source
		const src = HERO_VIDEOS[videoIndex];
		if (video.src !== src) {
			video.src = src;
			video.load();
		}

		// Play the video
		video.play().catch(() => {
			// Autoplay blocked - that's ok
		});
	}, [videoIndex]);

	// Setup ended listener
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEnded = () => {
			setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
		};

		video.addEventListener("ended", handleEnded, { once: false });
		return () => {
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible">
			{/* Background video */}
			<div className="absolute inset-0 z-0">
				<video
					ref={videoRef}
					autoPlay
					muted
					playsInline
					className="w-full h-full object-cover blur-sm transition-opacity duration-700"
				/>
				<div className="absolute inset-0 bg-linear-to-b from-slushup-green/60 via-slushup-green/40 to-slushup-green/50" />
			</div>

			{/* Right-side compact navigation widget */}
			<Navigation />

			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center overflow-hidden">
				<p className="text-white/80 text-sm font-medium tracking-wide uppercase mb-2">
					Premium Event Beverages
				</p>

				<motion.h1
					style={{ scale, y, opacity }}
					className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight origin-center"
				>
					"Live The SlushUp Life"
				</motion.h1>

				<p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
					Premium frozen treats and beverage experiences that leave your guests
					talking for years.
				</p>
			</div>
		</section>
	);
}
