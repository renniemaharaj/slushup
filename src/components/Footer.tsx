import { getAsset } from "../utils/assetRouter";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative bg-slushup-text text-white overflow-hidden">
			{/* Background Logo */}
			<img
				src={getAsset("slushUpLogo")}
				alt=""
				aria-hidden="true"
				draggable={false}
				className="
					pointer-events-none
					absolute
					-top-20
					-right-20
					w-80
					h-80
					rounded-full
					opacity-[0.06]
					object-contain
				"
			/>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
				{/* Top */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
					{/* Brand Copy */}
					<div>
						<h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
							SlushUp
						</h3>
						<p className="text-white/70 leading-relaxed text-sm sm:text-base max-w-sm">
							Premium frozen treats and beverage experiences crafted for
							unforgettable events. We bring professionalism, style, and lasting
							memories to every celebration.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-bold mb-6">Quick Links</h4>
						<nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base">
							<a
								href="#services"
								className="text-white/70 hover:text-white transition-colors"
							>
								Services
							</a>
							<a
								href="#occasions"
								className="text-white/70 hover:text-white transition-colors"
							>
								Event Types
							</a>
							<a
								href="#gallery"
								className="text-white/70 hover:text-white transition-colors"
							>
								Gallery
							</a>
							<a
								href="#contact"
								className="text-white/70 hover:text-white transition-colors"
							>
								Contact
							</a>
						</nav>
					</div>

					{/* Contact */}
					<div className="flex flex-col justify-between">
						<div>
							<h4 className="text-lg font-bold mb-4">Get In Touch</h4>
							<p className="text-white/70 mb-6 text-sm sm:text-base">
								Ready to book your event? We'd love to discuss your vision and
								create an unforgettable experience.
							</p>
						</div>

						<button
							type="button"
							className="self-start px-6 py-3 bg-slushup-green hover:bg-slushup-green-light text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm sm:text-base"
						>
							Contact Us
						</button>
					</div>
				</div>

				{/* Bottom */}
				<div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-white/50 text-sm text-center sm:text-left">
						© {currentYear} SlushUp Frozen Treats & Beverages. All rights
						reserved.
					</p>

					<p className="text-white/40 text-sm">Crafted with care</p>
				</div>
			</div>
		</footer>
	);
}
