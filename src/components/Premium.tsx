import { motion } from "framer-motion";
import assets from "../utils/assetRouter";

export function Premium() {
	const highlights = [
		"Professional bartenders and trained staff",
		"Premium spirits and quality ingredients",
		"Custom drink recipes tailored to your event",
		"Full bar setup and breakdown included",
		"Flexible packages to fit any budget",
		"Fully insured and licensed operations",
	];

	const socialLinks = [
		{
			id: "facebook",
			name: "Facebook",
			url: "https://www.facebook.com/share/1GPterdPaz/?mibextid=wwXIfr",
			icon: (
				<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
					<title>Facebook</title>
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
				</svg>
			),
		},
		{
			id: "instagram",
			name: "Instagram",
			url: "https://www.instagram.com/slushuptt?igsh=MWc4NGFzMHpxazJ3aQ==",
			icon: (
				<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
					<title>Instagram</title>
					<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.626c-.786.3-1.455.717-2.126 1.394-.677.67-1.083 1.335-1.39 2.110-.297.813-.501 1.693-.56 2.966C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.556 2.966.3.811.709 1.479 1.379 2.126.67.677 1.315 1.076 2.093 1.386.822.296 1.696.502 2.966.56C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.264 2.966-.556.81-.3 1.479-.709 2.126-1.379.677-.67 1.083-1.316 1.386-2.093.296-.822.502-1.696.56-2.966.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.556-2.966-.3-.81-.709-1.479-1.379-2.126C21.298 1.472 20.054 0.628 19.29 0.424c-.822-.296-1.696-.502-2.966-.56C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.356 1.057.41 2.227.061 1.264.07 1.645.07 4.849 0 3.203-.009 3.585-.07 4.849-.054 1.171-.246 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.38.896-.422.164-1.058.356-2.227.41-1.265.061-1.645.07-4.849.07-3.203 0-3.585-.009-4.849-.07-1.171-.054-1.805-.246-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.356-1.057-.41-2.227-.061-1.264-.07-1.645-.07-4.849 0-3.203.009-3.585.07-4.849.054-1.171.246-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.38-.896.422-.164 1.058-.356 2.227-.41 1.264-.061 1.645-.07 4.849-.07zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
				</svg>
			),
		},
	];

	return (
		<section className="bg-slushup-cream/30 py-20 sm:py-28 lg:py-32 overflow-hidden">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Profile Card */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col"
					>
						{/* Banner Container - Own relative parent for absolute positioning */}
						<div className="relative mb-20">
							{/* Banner Image */}
							<div className="h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-slushup-green/20 to-slushup-green/10">
								<img
									src={assets.banner}
									alt="SlushUp banner"
									className="w-full h-full object-cover"
									draggable={false}
								/>
								{/* Green Hue Overlay */}
								<div className="absolute inset-0 bg-slushup-green/15" />
							</div>

							{/* Profile Image - Positioned at bottom of banner with higher z-index */}
							<div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20">
								<div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-6 border-white shadow-2xl bg-gradient-to-br from-slushup-green/15 to-slushup-green/5 flex items-center justify-center">
									<img
										src={assets.logo}
										alt="SlushUp logo"
										className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover"
										draggable={false}
									/>
								</div>
							</div>
						</div>

						{/* Profile Info - Below Banner */}
						<div className="text-center">
							<h3 className="text-2xl sm:text-3xl font-bold text-slushup-text mb-2">
								SlushUp
							</h3>
							<p className="text-slushup-text/60 text-sm mb-6">
								Premium Event Beverages
							</p>

							{/* Social Links */}
							<div className="flex justify-center gap-4 mb-6">
								{socialLinks.map((social) => (
									<a
										key={social.id}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.name}
										className="p-3 rounded-full bg-slushup-cream/50 text-slushup-green hover:bg-slushup-green hover:text-white transition-all duration-200 hover:scale-110"
										title={social.name}
									>
										{social.icon}
									</a>
								))}
							</div>

							{/* Divider */}
							<div className="h-px bg-gray-200 mb-4" />

							{/* Description */}
							<p className="text-slushup-text/70 text-sm leading-relaxed px-4">
								Crafting unforgettable beverage experiences for every
								celebration
							</p>
						</div>
					</motion.div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						<p className="text-slushup-green text-sm font-medium tracking-wide uppercase mb-3">
							Why Choose Us
						</p>
						<h2 className="text-4xl sm:text-5xl font-bold text-slushup-text mb-6 leading-tight">
							Premium Experience Every Time
						</h2>
						<p className="text-lg text-slushup-text/70 mb-8 leading-relaxed">
							Every SlushUp event is crafted with meticulous attention to detail
							and unwavering commitment to excellence. We bring professionalism,
							style, and unforgettable moments to your celebration.
						</p>

						<ul className="space-y-4 mb-10">
							{highlights.map((highlight) => (
								<li
									key={highlight}
									className="flex items-start gap-4 text-slushup-text/80"
								>
									<svg
										aria-hidden="true"
										focusable="false"
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

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								type="button"
								onClick={() => {
									location.href =
										"https://docs.google.com/forms/d/1HhmbzN6esy_Y-aFH37kuYePjXYxKx-KiR8Lh6tjUCws/viewform";
								}}
								className="px-8 py-4 bg-white text-slushup-green rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								Book Your SlushUp
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
