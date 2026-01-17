import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type NavItem = {
	href: string;
	label: string;
};

const ITEMS: NavItem[] = [
	{ href: "#services", label: "Services" },
	{ href: "#occasions", label: "Occasions" },
	{ href: "#gallery", label: "Gallery" },
	{ href: "#footer", label: "Contact" },
];

type SectionColor =
	| "hero"
	| "services"
	| "audience"
	| "premium"
	| "gallery"
	| "cta"
	| "footer";

const SECTION_COLORS: Record<
	SectionColor,
	{ navBg: string; labelText: string; dotBg: string; dotHover: string }
> = {
	hero: {
		navBg: "bg-white/10",
		labelText: "text-white",
		dotBg: "bg-white",
		dotHover: "bg-white/90",
	},
	services: {
		navBg: "bg-white/20",
		labelText: "text-slushup-text",
		dotBg: "bg-black",
		dotHover: "bg-black/80",
	},
	audience: {
		navBg: "bg-white/20",
		labelText: "text-slushup-text",
		dotBg: "bg-black",
		dotHover: "bg-black/80",
	},
	premium: {
		navBg: "bg-slushup-cream/30",
		labelText: "text-slushup-text",
		dotBg: "bg-white",
		dotHover: "bg-white/90",
	},
	gallery: {
		navBg: "bg-white/20",
		labelText: "text-slushup-text",
		dotBg: "bg-black",
		dotHover: "bg-black/80",
	},
	cta: {
		navBg: "bg-white/20",
		labelText: "text-white",
		dotBg: "bg-black",
		dotHover: "bg-black/80",
	},
	footer: {
		navBg: "bg-white/10",
		labelText: "text-white",
		dotBg: "bg-white",
		dotHover: "bg-white/90",
	},
};

export function Navigation() {
	const containerRef = useRef<HTMLElement | null>(null);
	const [expanded, setExpanded] = useState(false);
	const [currentSection, setCurrentSection] = useState<SectionColor>("hero");

	/**
	 * Handle mobile viewport height changes (URL bar show/hide)
	 */
	const y = useMotionValue(0);
	const ySpring = useSpring(y, {
		stiffness: 300,
		damping: 40,
	});

	useEffect(() => {
		const update = () => {
			const vh = window.visualViewport?.height ?? window.innerHeight;
			y.set(vh / 2);
		};

		update();
		window.visualViewport?.addEventListener("resize", update);
		window.addEventListener("resize", update);

		return () => {
			window.visualViewport?.removeEventListener("resize", update);
			window.removeEventListener("resize", update);
		};
	}, [y]);

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

	return (
		<motion.nav
			ref={containerRef}
			aria-label="Section navigation"
			style={{ top: ySpring }}
			className="fixed right-4 z-30 -translate-y-1/2"
			onMouseEnter={() => setExpanded(true)}
			onMouseLeave={() => setExpanded(false)}
			onTouchStart={() => setExpanded(true)}
			onFocus={() => setExpanded(true)}
			onBlur={(e) => {
				if (!containerRef.current?.contains(e.relatedTarget as Node)) {
					setExpanded(false);
				}
			}}
		>
			<motion.ul
				layout
				className={`flex flex-col gap-1 p-2 rounded-lg backdrop-blur-md shadow-lg transition-colors duration-300 ${colors.navBg}`}
			>
				{ITEMS.map((item) => (
					<li key={item.href}>
						<motion.a
							href={item.href}
							layout
							className="relative flex items-center justify-end h-7 focus:outline-none"
						>
							{/* Drawer + Label */}
							<motion.div
								aria-hidden
								initial={false}
								animate={{
									opacity: expanded ? 1 : 0,
									x: expanded ? -10 : -4,
								}}
								transition={{ duration: 0.2 }}
								className={`absolute right-5 flex items-center h-7 px-3 rounded-md bg-white/90 shadow-sm pointer-events-none transition-colors duration-300`}
							>
								<span
									className={`text-sm font-medium ${colors.labelText} whitespace-nowrap`}
								>
									{item.label}
								</span>
							</motion.div>

							{/* Dot - Dynamic color based on section */}
							<motion.span
								className={`relative z-10 w-3 h-3 rounded-full transition focus:ring-2 cursor-pointer ${colors.dotBg} ${colors.dotBg === "bg-white" ? "focus:ring-white" : "focus:ring-black"}`}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="sr-only">{item.label}</span>
							</motion.span>
						</motion.a>
					</li>
				))}
			</motion.ul>
		</motion.nav>
	);
}
