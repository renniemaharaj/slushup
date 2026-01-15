export function Audience() {
	const audiences = [
		{
			id: "corporate",
			title: "Corporate Events",
			description:
				"Impress clients and reward employees with premium beverage experiences at conferences, product launches, and team celebrations.",
		},
		{
			id: "weddings",
			title: "Weddings",
			description:
				"Make your special day unforgettable with signature cocktails, mocktails, and frozen treats that delight every guest.",
		},
		{
			id: "professionals",
			title: "Professionals",
			description:
				"Perfect for networking events, happy hours, and social gatherings where great drinks make great connections.",
		},
	];

	return (
		<section className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16 sm:mb-20">
					<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
						Event Types
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Perfect For Every Occasion
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-3xl mx-auto leading-relaxed">
						From intimate gatherings to large celebrations, SlushUp creates unforgettable beverage experiences that elevate any event.
					</p>
				</div>

				<div className="space-y-16 lg:space-y-20">
					{audiences.map((audience, index) => (
						<div
							key={audience.id}
							className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-center`}
						>
							<div className="flex-1">
								<h3 className="text-3xl sm:text-4xl font-bold text-slushup-text mb-4 leading-tight">
									{audience.title}
								</h3>
								<p className="text-lg sm:text-xl text-slushup-text/70 leading-relaxed">
									{audience.description}
								</p>
							</div>
							<div className="flex-1 h-72 bg-gradient-to-br from-slushup-green/5 to-slushup-green/10 rounded-2xl shadow-sm" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
