export function Services() {
	const services = [
		{
			id: "mobile-bar",
			title: "Mobile Bar",
			description:
				"Fully equipped mobile bars with premium spirits, mixers, and professional bartenders.",
			icon: "🍸",
		},
		{
			id: "cocktails",
			title: "Signature Cocktails",
			description:
				"Craft cocktails designed to impress, with custom options to match your event.",
			icon: "🥂",
		},
		{
			id: "mocktails",
			title: "Mocktails",
			description:
				"Delicious non-alcoholic options for all your guests, no compromise on taste.",
			icon: "💧",
		},
		{
			id: "frozen-treats",
			title: "Frozen Treats",
			description:
				"Refreshing slushies, frozen cocktails, and dessert beverages that wow.",
			icon: "❄️",
		},
	];

	return (
		<section className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16 sm:mb-20">
					<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
						What We Offer
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Our Services
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-2xl mx-auto leading-relaxed">
						Comprehensive beverage solutions for every event need, delivered with premium quality and professional service.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
					{services.map((service) => (
						<div
							key={service.id}
							className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-slushup-green/30 hover:shadow-lg transition-all duration-300"
						>
							<div className="w-14 h-14 bg-slushup-green/10 rounded-xl flex items-center justify-center mb-6">
								<svg
									className="w-7 h-7 text-slushup-green"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-slushup-text mb-3 leading-tight">
								{service.title}
							</h3>
							<p className="text-slushup-text/70 leading-relaxed">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
