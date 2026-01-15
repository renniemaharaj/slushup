/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"slushup-green": "#2D7F4F",
				"slushup-green-light": "#4A9F6F",
				"slushup-cream": "#F5F1E8",
				"slushup-cream-dark": "#E8E3D8",
				"slushup-text": "#1a1a1a",
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
};
