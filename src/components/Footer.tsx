export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-slushup-text text-white">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
					{/* Brand */}
					<div>
						<h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
							SlushUp
						</h3>
						<p className="text-white/70 leading-relaxed text-sm sm:text-base">
							Premium frozen treats and beverage experiences crafted for unforgettable events. We bring professionalism, style, and lasting memories to every celebration.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-bold mb-6">Quick Links</h4>
						<nav className="space-y-3 flex flex-col">
							<a
								href="#services"
								className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
							>
								Services
							</a>
							<a
								href="#occasions"
								className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
							>
								Event Types
							</a>
							<a
								href="#gallery"
								className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
							>
								Gallery
							</a>
							<a
								href="#contact"
								className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
							>
								Contact
							</a>
						</nav>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-lg font-bold mb-4">Get In Touch</h4>
						<p className="text-white/70 mb-6 text-sm sm:text-base">
							Ready to book your event? We'd love to discuss your vision and create an unforgettable experience.
						</p>
						<button
							type="button"
							className="px-6 py-3 bg-slushup-green hover:bg-slushup-green-light text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm sm:text-base"
						>
							Contact Us
						</button>
					</div>
				</div>

				{/* Divider & Copyright */}
				<div className="border-t border-white/10 pt-8">
					<p className="text-center text-white/50 text-sm">
						© {currentYear} SlushUp Frozen Treats & Beverages. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
