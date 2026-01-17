import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import assets from "../utils/assetRouter";

type NavItem = {
	href: string;
	label: string;
};

const ITEMS: NavItem[] = [
	{ href: "#services", label: "Services" },
	{ href: "#occasions", label: "Occasions" },
	{ href: "#gallery", label: "Gallery" },
	{ href: "#contact", label: "Contact" },
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<motion.header
			className="fixed top-0 left-0 right-0 z-40 bg-slushup-text/95 backdrop-blur-sm border-b border-white/10"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 sm:h-20">
					{/* Logo */}
					<motion.a
						href="#top"
						className="flex items-center gap-2"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<img
							src={assets.logo}
							alt="SlushUp"
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
						/>
						<span className="text-white font-bold text-lg sm:text-xl tracking-tight">
							SlushUp
						</span>
					</motion.a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8 lg:gap-12">
						{ITEMS.map((item) => (
							<motion.a
								key={item.href}
								href={item.href}
								className="text-white/80 font-medium text-sm lg:text-base hover:text-white transition-colors duration-200"
								whileHover={{ color: "#ffffff" }}
							>
								{item.label}
							</motion.a>
						))}
						<motion.button
							type="button"
							className="px-6 py-2 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-colors duration-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Book Now
						</motion.button>
					</nav>

					{/* Mobile Hamburger */}
					<motion.button
						type="button"
						onClick={toggleMenu}
						className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
						aria-label="Toggle menu"
						whileTap={{ scale: 0.9 }}
					>
						<motion.span
							className="w-6 h-0.5 bg-white block"
							animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.span
							className="w-6 h-0.5 bg-white block"
							animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.span
							className="w-6 h-0.5 bg-white block"
							animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.nav
							className="md:hidden border-t border-white/10 bg-slushup-text/98"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="px-4 py-4 space-y-3">
								{ITEMS.map((item, index) => (
									<motion.a
										key={item.href}
										href={item.href}
										onClick={() => setIsOpen(false)}
										className="block px-4 py-3 text-white/80 font-medium rounded-lg hover:bg-white/10 hover:text-white transition-colors duration-200"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
									>
										{item.label}
									</motion.a>
								))}
								<motion.button
									type="button"
									className="w-full px-4 py-3 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-colors duration-200"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: ITEMS.length * 0.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Book Now
								</motion.button>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
}
