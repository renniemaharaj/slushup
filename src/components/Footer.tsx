export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-slushup-text text-white">
			<div className="section-container">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
					{/* Brand */}
					<div>
						<h3 className="text-2xl font-bold mb-4">SlushUp</h3>
						<p className="text-white/80 leading-relaxed">
							Premium frozen treats and beverage experiences for unforgettable
							events.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-bold mb-4">Quick Links</h4>
						<nav className="space-y-2">
							<a
								href="#services"
								className="text-white/80 hover:text-white transition-colors"
							>
								Services
							</a>
							<a
								href="#occasions"
								className="text-white/80 hover:text-white transition-colors"
							>
								Occasions
							</a>
							<a
								href="#gallery"
								className="text-white/80 hover:text-white transition-colors"
							>
								Gallery
							</a>
							<a
								href="#contact"
								className="text-white/80 hover:text-white transition-colors"
							>
								Contact
							</a>
						</nav>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-lg font-bold mb-4">Get In Touch</h4>
						<p className="text-white/80 mb-2">
							Ready to book? We'd love to hear from you.
						</p>
						<button
							type="button"
							className="px-6 py-2 bg-slushup-green hover:bg-slushup-green-light text-white rounded-lg font-semibold transition-colors"
						>
							Contact Us
						</button>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-white/20 pt-8">
					<p className="text-center text-white/60">
						© {currentYear} SlushUp Frozen Treats & Beverages. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
