import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentSectionAtom } from "../states/cursection";

type NavItem = {
	href: string;
	label: string;
};

type SectionConfig = {
	navBg: string;
	labelText: string;
	dotBg: string;
	dotHover: string;
};

const sections: NavItem[] = [
	{ href: "#services", label: "Services" },
	{ href: "#occasions", label: "Occasions" },
	{ href: "#gallery", label: "Gallery" },
	{ href: "#footer", label: "Contact" },
];

const sectionStyles: Record<string, SectionConfig> = {
	hero: {
		navBg: "bg-white/10",
		labelText: "text-black",
		dotBg: "bg-white",
		dotHover: "bg-white/90",
	},
	services: {
		navBg: "bg-white/20",
		labelText: "text-black",
		dotBg: "bg-slushup-green",
		dotHover: "bg-black/80",
	},
	audience: {
		navBg: "bg-white/20",
		labelText: "text-black",
		dotBg: "bg-slushup-green",
		dotHover: "bg-black/80",
	},
	premium: {
		navBg: "bg-slushup-cream/30",
		labelText: "text-black",
		dotBg: "bg-slushup-green",
		dotHover: "bg-black/80",
	},
	gallery: {
		navBg: "bg-white/20",
		labelText: "text-black",
		dotBg: "bg-slushup-green",
		dotHover: "bg-black/80",
	},
	cta: {
		navBg: "bg-white/20",
		labelText: "text-black",
		dotBg: "bg-slushup-green",
		dotHover: "bg-black/80",
	},
	footer: {
		navBg: "bg-white/10",
		labelText: "text-black",
		dotBg: "bg-white",
		dotHover: "bg-white/90",
	},
};

export function Navigation() {
	const ref = useRef<HTMLElement | null>(null);
	const [expanded, setExpanded] = useState(false);

	const currentSection = useAtomValue(currentSectionAtom);
	const styles = sectionStyles[currentSection] ?? sectionStyles.hero;

	const y = useMotionValue(0);
	const ySpring = useSpring(y, { stiffness: 300, damping: 40 });

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

	return (
		<motion.nav
			ref={ref}
			aria-label="Section navigation"
			style={{ top: ySpring }}
			className="fixed right-4 z-30 -translate-y-1/2"
			onMouseEnter={() => setExpanded(true)}
			onMouseLeave={() => setExpanded(false)}
			onTouchStart={() => setExpanded(true)}
			onFocus={() => setExpanded(true)}
			onBlur={(e) => {
				if (!ref.current?.contains(e.relatedTarget as Node)) {
					setExpanded(false);
				}
			}}
		>
			<motion.ul
				layout
				className={`flex flex-col gap-1 p-2 rounded-lg backdrop-blur-md shadow-lg transition-colors duration-300 ${styles.navBg}`}
			>
				{sections.map((item) => (
					<li key={item.href}>
						<motion.a
							href={item.href}
							layout
							className="relative flex items-center justify-end h-7 focus:outline-none"
						>
							<motion.div
								aria-hidden
								initial={false}
								animate={{
									opacity: expanded ? 1 : 0,
									x: expanded ? -10 : -4,
								}}
								transition={{ duration: 0.2 }}
								className="absolute right-5 flex items-center h-7 px-3 rounded-md bg-white/90 shadow-sm pointer-events-none"
							>
								<span className={`text-sm font-medium ${styles.labelText}`}>
									{item.label}
								</span>
							</motion.div>

							<motion.span
								className={`relative z-10 w-3 h-3 rounded-full cursor-pointer ${styles.dotBg}`}
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
