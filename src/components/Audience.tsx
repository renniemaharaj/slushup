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
		<section className="max-w-6xl mx-auto px-4 py-12 md:py-20 bg-white">
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold text-slushup-green mb-4">
					Perfect For Every Occasion
				</h2>
				<p className="text-xl text-slushup-text max-w-2xl mx-auto">
					From intimate gatherings to large celebrations, SlushUp brings the
					premium experience
				</p>
			</div>

			<div className="space-y-12">
				{audiences.map((audience, index) => (
					<div
						key={audience.id}
						className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
					>
						<div className="flex-1">
							<h3 className="text-3xl font-bold text-slushup-green mb-4">
								{audience.title}
							</h3>
							<p className="text-lg text-slushup-text leading-relaxed">
								{audience.description}
							</p>
						</div>
						<div className="flex-1 h-64 bg-gradient-to-br from-slushup-green/10 to-slushup-cream rounded-xl" />
					</div>
				))}
			</div>
		</section>
	);
}
