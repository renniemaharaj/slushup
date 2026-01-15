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
		<section className="max-w-6xl mx-auto px-4 py-12 md:py-20 bg-slushup-cream">
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold text-slushup-green mb-4">
					Our Services
				</h2>
				<p className="text-xl text-slushup-text max-w-2xl mx-auto">
					Everything you need for an unforgettable beverage experience
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{services.map((service) => (
					<div
						key={service.id}
						className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slushup-cream-dark"
					>
						<svg
							className="w-12 h-12 text-slushup-green mb-4"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<h3 className="text-2xl font-bold text-slushup-green mb-3">
							{service.title}
						</h3>
						<p className="text-slushup-text leading-relaxed">
							{service.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
