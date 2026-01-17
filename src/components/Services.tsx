import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export function Services() {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [showAll, setShowAll] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const services = [
		{
			id: "mobile-bar",
			title: "Mobile Bar",
			description:
				"Fully equipped mobile bars with premium spirits, mixers, and professional bartenders. Our experienced team handles setup, service, and breakdown.",
			details: [
				"Custom spirit selection",
				"Professional bartenders included",
				"Premium glassware & garnishes",
				"Full setup & teardown",
			],
		},
		{
			id: "cocktails",
			title: "Signature Cocktails",
			description:
				"Craft cocktails designed to impress, with custom options to match your event theme and guest preferences.",
			details: [
				"Custom recipe development",
				"Themed cocktail menus",
				"Seasonal ingredients",
				"Premium spirits & mixers",
			],
		},
		{
			id: "mocktails",
			title: "Mocktails",
			description:
				"Delicious non-alcoholic options for all your guests, with zero compromise on taste or presentation.",
			details: [
				"Sophisticated flavor profiles",
				"Premium juice selections",
				"Fresh fruit garnishes",
				"Alcohol-free but impressive",
			],
		},
		{
			id: "frozen-treats",
			title: "Frozen Treats",
			description:
				"Refreshing slushies, frozen cocktails, and dessert beverages that wow your guests in any season.",
			details: [
				"Frozen cocktails & slushies",
				"Dessert beverages",
				"Custom flavors available",
				"Perfect for warm events",
			],
		},
	];

	const visibleServices = showAll ? services : services.slice(0, 3);

	return (
		<section
			ref={containerRef}
			id="services"
			className="bg-white py-20 sm:py-28 lg:py-32"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center mb-16 sm:mb-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-slushup-green/80 text-sm font-medium tracking-wide uppercase mb-3">
						What We Offer
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Our Services
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-2xl mx-auto leading-relaxed">
						Comprehensive beverage solutions for every event need, delivered
						with premium quality and professional service.
					</p>
				</motion.div>

				<div className="relative">
					<div
						className={`grid gap-6 sm:gap-8 lg:gap-8
	${showAll ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
					>
						<AnimatePresence initial={false}>
							{visibleServices.map((service) => (
								<motion.div
									key={service.id}
									layout
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 18 }}
									transition={{ duration: 0.35, ease: "easeOut" }}
									className="bg-white rounded-2xl border border-gray-100 hover:border-slushup-green/30 transition-all duration-300 overflow-hidden"
								>
									<button
										type="button"
										onClick={() =>
											setExpandedId(
												expandedId === service.id ? null : service.id,
											)
										}
										className="w-full p-6 sm:p-8 text-left hover:bg-slushup-green/5 transition-colors duration-200 flex items-start justify-between gap-4"
									>
										<div className="flex gap-4 items-start flex-1">
											<div className="w-12 h-12 bg-slushup-green/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
												<svg
													aria-hidden="true"
													className="w-6 h-6 text-slushup-green"
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

											<div>
												<h3 className="text-xl font-bold text-slushup-text mb-2 leading-tight">
													{service.title}
												</h3>
												<p className="text-slushup-text/70 leading-relaxed">
													{service.description}
												</p>
											</div>
										</div>

										<svg
											aria-hidden="true"
											className={`w-5 h-5 text-slushup-green flex-shrink-0 transition-transform duration-300 ${
												expandedId === service.id ? "" : "rotate-180"
											}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 14l-7-7m0 0L5 14m7-7v12"
											/>
										</svg>
									</button>

									<AnimatePresence initial={false}>
										{expandedId === service.id && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3, ease: "easeOut" }}
												className="border-t border-gray-100 px-6 sm:px-8 py-6 bg-slushup-green/[0.03] overflow-hidden"
											>
												<ul className="space-y-3">
													{service.details.map((detail, idx) => (
														<li
															key={idx}
															className="flex items-center gap-3 text-slushup-text/80"
														>
															<span className="w-1.5 h-1.5 bg-slushup-green/70 rounded-full flex-shrink-0" />
															{detail}
														</li>
													))}
												</ul>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{!showAll && (
						<div className="absolute inset-x-0 bottom-0 pt-28 bg-gradient-to-t from-slushup-green/15 via-slushup-green/5 to-transparent flex justify-center pointer-events-none">
							<button
								type="button"
								onClick={() => setShowAll(true)}
								className="pointer-events-auto mb-6 px-6 py-3 rounded-full bg-slushup-green/90 text-white font-medium shadow-lg hover:bg-slushup-green transition"
							>
								See more services
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
