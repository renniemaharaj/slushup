export function Premium() {
	const highlights = [
		"Professional bartenders and trained staff",
		"Premium spirits and quality ingredients",
		"Custom drink recipes tailored to your event",
		"Full bar setup and breakdown included",
		"Flexible packages to fit any budget",
		"Fully insured and licensed operations",
	];

	return (
		<section className="bg-slushup-cream/30 py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Image/Video Placeholder */}
					<div className="h-96 lg:h-[28rem] bg-gradient-to-br from-slushup-green/15 to-slushup-green/5 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center">
						<div className="text-center">
							<svg
								className="w-24 h-24 text-slushup-green mx-auto mb-4"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 3a1 1 0 000 2 1 1 0 000-2zM3 5.5a1 1 0 100 2 1 1 0 000-2zM14 5.5a1 1 0 100 2 1 1 0 000-2zM2 10a1 1 0 100 2 1 1 0 000-2zM16 10a1 1 0 100 2 1 1 0 000-2zM3 14.5a1 1 0 100 2 1 1 0 000-2zM14 14.5a1 1 0 100 2 1 1 0 000-2zM10 15a1 1 0 000 2 1 1 0 000-2z" />
							</svg>
							<p className="text-slushup-text/70 mt-2">Premium Experience</p>
						</div>
					</div>

					{/* Content */}
					<div>
						<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
							Why Choose Us
						</p>
						<h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-slushup-text mb-6 leading-tight">
							Premium Experience Every Time
						</h2>
						<p className="text-lg sm:text-lg text-slushup-text/70 mb-8 leading-relaxed">
							Every SlushUp event is crafted with meticulous attention to detail and unwavering commitment to excellence. We bring professionalism, style, and unforgettable moments to your celebration.
						</p>
						<ul className="space-y-4 mb-10">
							{highlights.map((highlight) => (
								<li
									key={highlight}
									className="flex items-start gap-4 text-slushup-text/80"
								>
									<svg
										className="w-6 h-6 text-slushup-green mt-0.5 flex-shrink-0"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
									<span className="leading-relaxed">{highlight}</span>
								</li>
							))}
						</ul>
						<button
							type="button"
							className="px-8 py-3 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-all duration-200 shadow-md hover:shadow-lg"
						>
							See Our Premium Packages
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
