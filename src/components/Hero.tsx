import { getAsset } from "../utils/assetRouter";

export function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slushup-cream">
			{/* Background video or image */}
			<div className="absolute inset-0 z-0">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover opacity-30"
				>
					<source src={getAsset("barVideoShort")} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-gradient-to-b from-slushup-cream/80 to-slushup-cream/60" />
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20 text-center">
				<h1 className="text-4xl md:text-6xl font-bold text-slushup-green mb-6 leading-tight">
					SlushUp: Frozen Treats & Beverages
				</h1>

				<p className="text-lg md:text-2xl text-slushup-text mb-8 max-w-2xl mx-auto leading-relaxed">
					Premium mobile bars bringing unforgettable frozen moments to your
					corporate events, weddings, and celebrations.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						type="button"
						className="px-6 py-3 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-colors"
					>
						Book Your SlushUp
					</button>
					<button
						type="button"
						className="px-6 py-3 bg-white border-2 border-slushup-green text-slushup-green rounded-lg font-semibold hover:bg-slushup-cream-dark transition-colors"
					>
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
}
