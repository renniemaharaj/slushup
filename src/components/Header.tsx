import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

type SectionColor =
	| "hero"
	| "services"
	| "audience"
	| "premium"
	| "gallery"
	| "cta"
	| "footer";

const SECTION_COLORS: Record<SectionColor, { bg: string; text: string }> = {
	hero: { bg: "bg-slushup-text/0", text: "text-white" },
	services: { bg: "bg-white/95 border-white/20", text: "text-slushup-text" },
	audience: { bg: "bg-white/95 border-white/20", text: "text-slushup-text" },
	premium: {
		bg: "bg-slushup-cream/90 border-slushup-cream/30",
		text: "text-slushup-text",
	},
	gallery: { bg: "bg-white/95 border-white/20", text: "text-slushup-text" },
	cta: {
		bg: "bg-slushup-green/95 border-slushup-green/50",
		text: "text-white",
	},
	footer: { bg: "bg-slushup-text/95 border-white/10", text: "text-white" },
};

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSection, setCurrentSection] = useState<SectionColor>("hero");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const sections: Array<{ id: SectionColor; selector: string }> = [
				{ id: "hero", selector: "section:nth-of-type(1)" },
				{ id: "services", selector: "#services" },
				{ id: "audience", selector: "#occasions" },
				{ id: "premium", selector: "section:nth-of-type(5)" },
				{ id: "gallery", selector: "#gallery" },
				{ id: "cta", selector: "section:nth-of-type(7)" },
				{ id: "footer", selector: "footer" },
			];

			const scrollY = window.scrollY;
			const viewportHeight = window.innerHeight;

			for (const section of sections) {
				const element = document.querySelector(section.selector);
				if (!element) continue;

				const rect = element.getBoundingClientRect();
				const elementTop = rect.top + scrollY;
				const elementBottom = elementTop + rect.height;

				// Check if section is in viewport (with some margin)
				if (
					scrollY + viewportHeight * 0.3 >= elementTop &&
					scrollY <= elementBottom
				) {
					setCurrentSection(section.id);
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const colors = SECTION_COLORS[currentSection];
	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-40 ${colors.bg} backdrop-blur-sm border-b transition-colors duration-300 shadow-sm`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 sm:h-20 gap-4">
					{/* Logo */}
					<motion.a
						href="#hero"
						className="flex items-center gap-2 shrink-0"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<img
							src={assets.logo}
							alt="SlushUp"
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
						/>
						<span
							className={`${colors.text} font-bold text-lg sm:text-xl tracking-tight hidden sm:inline`}
						>
							SlushUp
						</span>
					</motion.a>

					{/* Desktop Navigation - visible only on md+ */}
					<nav className="hidden md:flex! items-center gap-6 lg:gap-10 flex-1 justify-end">
						{ITEMS.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className={`${colors.text} font-medium text-sm lg:text-base transition-opacity duration-200 hover:opacity-70 whitespace-nowrap`}
							>
								{item.label}
							</a>
						))}
						<a
							href="#contact"
							className="px-6 py-2 bg-slushup-green text-white! rounded-lg font-semibold hover:bg-slushup-green-light transition-colors duration-200 shrink-0 inline-block"
						>
							Book Now
						</a>
					</nav>

					{/* Mobile Hamburger - visible only on mobile with inline styles */}
					<button
						type="button"
						onClick={toggleMenu}
						style={{
							display: isMobile ? "flex" : "none",
							flexDirection: "column",
							gap: "0.375rem",
							padding: "0.5rem",
							borderRadius: "0.5rem",
							transition: "background-color 0.2s",
							flexShrink: 0,
							backgroundColor: "transparent",
							border: "none",
							cursor: "pointer",
						}}
						className={
							colors.text === "text-white"
								? "hover:bg-white/10"
								: "hover:bg-black/5"
						}
						aria-label="Toggle menu"
					>
						<span
							style={{
								width: "1.5rem",
								height: "0.125rem",
								display: "block",
								backgroundColor:
									colors.text === "text-white" ? "white" : "#1a1a1a",
								transition: "transform 0.3s, opacity 0.3s",
								transform: isOpen
									? "rotate(45deg) translateY(10px)"
									: "rotate(0deg) translateY(0px)",
							}}
						/>
						<span
							style={{
								width: "1.5rem",
								height: "0.125rem",
								display: "block",
								backgroundColor:
									colors.text === "text-white" ? "white" : "#1a1a1a",
								opacity: isOpen ? 0 : 1,
								transition: "opacity 0.3s",
							}}
						/>
						<span
							style={{
								width: "1.5rem",
								height: "0.125rem",
								display: "block",
								backgroundColor:
									colors.text === "text-white" ? "white" : "#1a1a1a",
								transition: "transform 0.3s, opacity 0.3s",
								transform: isOpen
									? "rotate(-45deg) translateY(-10px)"
									: "rotate(0deg) translateY(0px)",
							}}
						/>
					</button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.nav
							className={`md:hidden border-t transition-colors duration-300 ${colors.bg} ${colors.text === "text-white" ? "border-white/10" : "border-gray-200"}`}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="px-4 py-4 space-y-3">
								{ITEMS.map((item) => (
									<button
										key={item.href}
										type="button"
										onClick={() => {
											location.href = item.href;
										}}
										className={`w-full text-left block px-4 py-3 ${colors.text} font-medium rounded-lg hover:opacity-70 transition-opacity duration-200`}
									>
										{item.label}
									</button>
								))}
								<button
									type="button"
									onClick={() => {
										location.href = "#contact";
									}}
									className="w-full px-4 py-3 bg-slushup-green text-white rounded-lg font-semibold hover:bg-slushup-green-light transition-colors duration-200"
								>
									Book Now
								</button>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
}
