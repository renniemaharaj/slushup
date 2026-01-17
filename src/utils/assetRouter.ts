/**
 * Asset Router
 *
 * Centralized asset management providing a single source of truth for all public assets.
 * ONLY includes files that actually exist in /public directory.
 */

const assets = {
	// Logo
	logo: "/slushup.jpg",

	// Bar Images (only files that exist)
	bar1: "/bar-image.jpeg",
	bar2: "/bar-image-2.jpeg",
	bar3: "/bar-image-3.jpeg",
	barWithPeople1: "/bar-image-with-people.jpeg",
	barWithPeople2: "/bar-image-with-people-2.jpeg",
	barWithPeople3: "/bar-image-3-with-people.jpeg",
    barWithPeopleWide2: "/bar-image-with-people-3-wide.jpeg",
	barWithPeopleWide: "/bar-image-with-people-wide.jpeg",

	// Drink Images (only files that exist)
	drinkWatermelon: "/drink-image-watermelon.jpeg",
	drinkYellow: "/drink-image-yellow.jpeg",
	drinkGreen: "/drink-image-green.jpeg",
	drinkRedBlue: "/drink-image-red-background-blue.jpeg",
	drinkRedPurple: "/drink-image-red-background-purple.jpeg",
	drinksWeddingsWide: "/drinks-image-weddings-wide.jpeg",
	drinksCream: "/drinks-image-cream.jpeg",
	drinksSunset: "/drinks-image-sunset.jpeg",
	drinksBabyLucasSignage: "/drinks-image-baby-lucas-signage.jpeg",
    drinksBirthdaySignageWide: "/drinks-image-birthday-signage-wide.jpeg",
	drinksMany: "/drinks-image-many.jpeg",
	drinksMany2: "/drinks-image-many-2.jpeg",

	// Signage (only files that exist)
	cheersSignage: "/drinks-image-cheers-signage.jpeg",
	cheersSignageWide: "/drinks-image-cheers-wide.jpeg",
	purpleSignage: "/signage-image-purple.jpeg",

	// People (only files that exist)
	people1: "/people-image-1.jpeg",
	people2: "/people-image-2.jpeg",
	people3: "/people-image-3.jpeg",
	peopleWide: "/people-image-3-wide.jpeg",

	// Videos (only files that exist)
	videoBarShort: "/bar-video-short.mp4",
	videoDrinkRed: "/drink-image-red.mp4",
	videoDrinksSignagePan: "/drinks-video-short-pan-to-signage.mp4",
} as const;

export default assets;
export type AssetKey = keyof typeof assets;
