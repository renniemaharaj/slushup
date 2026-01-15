export function CallToAction() {
	return (
		<section className="max-w-6xl mx-auto px-4 py-12 md:py-20 bg-slushup-green text-white">
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
					Ready to SlushUp Your Event?
				</h2>
				<p className="text-xl mb-8 leading-relaxed opacity-95">
					Let's create an unforgettable beverage experience for your guests.
					Contact us today to discuss your event needs and get a custom quote.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
					<button
						type="button"
						className="px-8 py-4 bg-white text-slushup-green rounded-lg font-semibold hover:bg-slushup-cream transition-colors"
					>
						Book Your SlushUp
					</button>
					<button
						type="button"
						className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-colors"
					>
						Get a Quote
					</button>
				</div>{" "}
				<p className="text-lg opacity-90">
					Available for events in your area. Let's chat about your vision!
				</p>
			</div>
		</section>
	);
}
