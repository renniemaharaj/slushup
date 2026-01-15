export function CallToAction() {
	return (
		<section className="bg-slushup-green py-20 sm:py-28 lg:py-32 text-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
					Ready to Elevate Your Event?
				</h2>
				<p className="text-lg sm:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
					Let's create an unforgettable beverage experience that your guests will remember for years.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
					<button
						type="button"
						className="px-8 py-4 bg-white text-slushup-green rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						Book Your SlushUp
					</button>
					<button
						type="button"
						className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
					>
						Get a Quote
					</button>
				</div>
			</div>
		</section>
	);
}
