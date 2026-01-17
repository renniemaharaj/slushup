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

export function Navigation() {
	const containerRef = useRef<HTMLElement | null>(null);
	const [expanded, setExpanded] = useState(false);

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
				className="flex flex-col gap-1 p-2 rounded-lg bg-black/20 backdrop-blur-sm"
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
								className="absolute right-5 flex items-center h-7 px-3 rounded-md bg-white/90 shadow-sm pointer-events-none"
							>
								<span className="text-sm font-medium text-gray-900 whitespace-nowrap">
									{item.label}
								</span>
							</motion.div>

							{/* Dot */}
							<span className="relative z-10 w-3 h-3 rounded-full bg-white/80 hover:bg-white transition focus:ring-2 focus:ring-white">
								<span className="sr-only">{item.label}</span>
							</span>
						</motion.a>
					</li>
				))}
			</motion.ul>
		</motion.nav>
	);
}
