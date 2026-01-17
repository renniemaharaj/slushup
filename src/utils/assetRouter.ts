/**
 * Asset Router
 *
 * Centralized asset management providing a single source of truth for all public assets.
 * Organized by asset type with clear naming conventions.
 */

const assets = {
	// Logo (both names for compatibility)
	logo: "/slushup.jpg",
	appLogo: "/slushup.jpg",
	slushUpLogo: "/slushup.jpg",

	// Bar & Venue Images
	barMain: "/bar-main.jpeg",
	bar1: "/bar-image.jpeg",
	barSecondary: "/bar-secondary.jpeg",
	bar2: "/bar-image-2.jpeg",
	barTertiary: "/bar-tertiary.jpeg",
	bar3: "/bar-image-3.jpeg",
	barWithPeople: "/bar-with-people.jpeg",
	barWithPeople1: "/bar-image-with-people.jpeg",
	barWithPeople2: "/bar-image-with-people-2.jpeg",
	barWithPeople3: "/bar-image-3-with-people.jpeg",
	barWithPeopleWide: "/bar-with-people-wide.jpeg",
	barWithPeopleWide1: "/bar-image-with-people-wide.jpeg",

	// Drink Images
	drinkWatermelon: "/drink-watermelon.jpeg",
	drinkYellow: "/drink-yellow.jpeg",
	drinkRedPurple: "/drink-red-purple.jpeg",
	drinkGreen: "/drink-green.jpeg",
	drinkRedBlue: "/drink-red-blue.jpeg",
	drinksRedBlue: "/drinks-image-red-background-blue.jpeg",
	drinkWeddingsWide: "/drink-weddings-wide.jpeg",
	drinksWeddingsWide: "/drinks-image-weddings-wide.jpeg",
	drinkCream: "/drink-cream.jpeg",
	drinksCream: "/drinks-image-cream.jpeg",
	drinkSunset: "/drink-sunset.jpeg",
	drinksSunset: "/drinks-image-sunset.jpeg",
	drinkSignageBabyLucas: "/drink-signage-baby-lucas.jpeg",
	drinksBabyLucasSignage: "/drinks-image-baby-lucas-signage.jpeg",
	drinkMany: "/drink-many.jpeg",
	drinksMany: "/drinks-image-many.jpeg",
	drinkMany2: "/drink-many-2.jpeg",
	drinksMany2: "/drinks-image-many-2.jpeg",

	// Signage & Decorations
	signageCheers: "/signage-cheers.jpeg",
	cheersSignage: "/drinks-image-cheers-signage.jpeg",
	signageCheersWide: "/signage-cheers-wide.jpeg",
	cheersSignageWide: "/drinks-image-cheers-wide.jpeg",
	signagePurple: "/signage-purple.jpeg",
	purpleSignage: "/signage-image-purple.jpeg",

	// People
	peopleGroup1: "/people-group-1.jpeg",
	people1: "/people-image-1.jpeg",
	peopleGroup2: "/people-group-2.jpeg",
	people2: "/people-image-2.jpeg",
	peopleGroup3: "/people-group-3.jpeg",
	people3: "/people-image-3.jpeg",
	peopleGroupWide: "/people-group-wide.jpeg",
	peopleWide1: "/people-image-3-wide.jpeg",

	// Videos
	videoBarShort: "/bar-video-short.mp4",
	barVideoShort: "/bar-video-short.mp4",
	videoDrinkRed: "/video-drink-red.mp4",
	drinkRed: "/drink-image-red.mp4",
	videoDrinksSignagePan: "/video-drinks-signage-pan.mp4",
	drinksVideoShortPan: "/drinks-video-short-pan-to-signage.mp4",
} as const;

export default assets;
export type AssetKey = keyof typeof assets;
