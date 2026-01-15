import "./App.css";
import {
	Audience,
	CallToAction,
	Footer,
	Gallery,
	Hero,
	Premium,
	Services,
} from "./components";

function App() {
	return (
		<main className="min-h-screen bg-slushup-cream">
			<Hero />
			<Services />
			<Audience />
			<Premium />
			<Gallery />
			<CallToAction />
			<Footer />
		</main>
	);
}

export default App;
