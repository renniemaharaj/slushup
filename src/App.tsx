import "./App.css";
import { motion, type Variants } from "framer-motion";
import {
	Audience,
	CallToAction,
	Footer,
	Gallery,
	Hero,
	Premium,
	Services,
} from "./components";

const sectionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.2,
			duration: 0.9,
			ease: "easeInOut",
		},
	},
};

function Section({ children }: { children: React.ReactNode }) {
	return (
		<motion.section
			variants={sectionVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
		>
			{children}
		</motion.section>
	);
}

function App() {
	return (
		<main className="min-h-screen bg-slushup-cream">
			<Hero />

			<Services />

			<Section>
				<Audience />
			</Section>

			<Section>
				<Premium />
			</Section>

			<Section>
				<Gallery />
			</Section>

			<Section>
				<CallToAction />
			</Section>

			<Footer />
		</main>
	);
}

export default App;
