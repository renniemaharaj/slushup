import { getAsset } from "../utils/assetRouter";

export function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
		{/* Background video with overlay */}
		<div className="absolute inset-0 z-0">
			<video
				autoPlay
				muted
				loop
				playsInline
				className="w-full h-full object-cover blur-sm"
			>
				<source src={getAsset("barVideoShort")} type="video/mp4" />
			</video>
			<div className="absolute inset-0 bg-gradient-to-b from-slushup-green/60 via-slushup-green/40 to-slushup-green/50" />
		</div>			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
				<div className="mb-8 space-y-1">
					<p className="text-white/80 text-sm font-medium tracking-wide uppercase">
						Premium Event Beverages
					</p>
				</div>

				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
					SlushUp Your Events
				</h1>

				<p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
					Premium frozen treats and beverage experiences that leave your guests talking for years.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button
						type="button"
						className="px-8 py-4 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						Book Your SlushUp
					</button>
					<button
						type="button"
						className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
					>
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
}
