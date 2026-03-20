import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Navigation } from "./Navigation";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cart-white-hero.jpeg"
          alt="SlushUp Mobile Bar Cart"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slushup-green/60 via-slushup-green/40 to-slushup-green/50" />
      </div>

      {/* Right-side compact navigation widget */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center overflow-hidden">
        <p className="text-white/80 text-sm font-medium tracking-wide uppercase mb-2">
          Premium Alcoholic &amp; Non-Alcoholic Treats
        </p>

        <motion.h1
          style={{ scale, y, opacity }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight origin-center"
        >
          Luxury Mobile Bar &amp; Bartending Services
        </motion.h1>

        <p className="text-lg sm:text-xl text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
          Welcome to SlushUp Mobile Bar — a luxury mobile bartending experience
          designed to elevate your special events.
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-base sm:text-lg text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
                We offer beautifully styled mobile bar rentals and professional
                bartenders for weddings, private parties, corporate functions,
                and celebrations of all kinds.
              </p>

              <p className="text-base sm:text-lg text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
                Our signature bar setups and carefully crafted drink selections
                bring together exceptional cocktails, refreshing mocktails, and
                premium beverages — all served with style and sophistication.
              </p>

              <p className="text-base sm:text-lg text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed font-light italic">
                At SlushUp, we don't just serve drinks — we create unforgettable
                experiences for you and your guests.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors duration-200 flex items-center gap-1 mx-auto"
        >
          {expanded ? "Show less" : "Read more"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            ▼
          </motion.span>
        </button>

        <button
          type="button"
          onClick={() => {
            location.href =
              "https://docs.google.com/forms/d/1HhmbzN6esy_Y-aFH37kuYePjXYxKx-KiR8Lh6tjUCws/viewform";
          }}
          className="px-8 py-4 bg-white text-slushup-green rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get a Quote
        </button>
      </div>
    </section>
  );
}
