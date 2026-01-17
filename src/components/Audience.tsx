import { motion } from "framer-motion";
import assets from "../utils/assetRouter";

const { barWithPeopleWide, peopleWide, drinksWeddingsWide } = assets;

export function Audience() {
	const audiences = [
		{
			id: "birthday-parties",
			title: "Birthday Parties",
			description:
				"Celebrate in style with custom beverage options that make your birthdays truly memorable.",
		},
		{
			id: "corporate",
			title: "Corporate Events",
			description:
				"Impress clients and reward employees with premium beverage experiences at conferences, product launches, and team celebrations.",
			thumbnail: barWithPeopleWide,
		},
		{
			id: "weddings",
			title: "Weddings",
			description:
				"Make your special day unforgettable with signature cocktails, mocktails, and frozen treats that delight every guest.",
			thumbnail: drinksWeddingsWide,
		},
		{
			id: "professionals",
			title: "Professionals",
			description:
				"Perfect for networking events, happy hours, and social gatherings where great drinks make great connections.",
			thumbnail: peopleWide,
		},
	];

	return (
		<section id="occasions" className="bg-white py-20 sm:py-28 lg:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center mb-16 sm:mb-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-slushup-green/80 text-sm font-medium tracking-wide uppercase mb-3">
						Event Types
					</p>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slushup-text mb-6 tracking-tight">
						Perfect For Every Occasion
					</h2>
					<p className="text-lg sm:text-xl text-slushup-text/70 max-w-3xl mx-auto leading-relaxed">
						From intimate gatherings to large celebrations, SlushUp creates
						unforgettable beverage experiences that elevate any event.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{audiences.map((audience, index) => (
						<motion.div
							key={audience.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group bg-white border border-gray-100 rounded-2xl p-8 hover:border-slushup-green/30 transition-all duration-300"
						>
							{/* Thumbnail slot */}
							<div className="mb-6 h-24 w-full overflow-hidden rounded-xl">
								{audience.thumbnail ? (
									<img
										src={audience.thumbnail}
										alt={audience.title}
										className="h-full w-full object-cover object-top"
										loading="lazy"
									/>
								) : (
									<div className="h-full w-full bg-gradient-to-br from-slushup-green/[0.04] to-slushup-green/[0.12]" />
								)}
							</div>

							<h3 className="text-2xl font-bold text-slushup-text mb-3 leading-tight">
								{audience.title}
							</h3>

							<p className="text-slushup-text/70 leading-relaxed">
								{audience.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
