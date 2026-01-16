/**
 * Asset Router
 *
 * Maps asset references to their paths in the public folder.
 * This provides a single source of truth for asset management,
 * making it easy to update or reorganize assets without touching components.
 */

export const assetRoutes = {
    // Logo
    slushUpLogo: "/slushup.jpg",
	// Bar & Venue Images
	barImage: "/bar-image.jpeg",
	barImage2: "/bar-image-2.jpeg",
    barImage3: "/bar-image-3.jpeg",
	barImageWithPeople: "/bar-image-with-people.jpeg",
	barImageWithPeople2: "/bar-image-with-people-2.jpeg",

	// Drink Images
	drinkImageWatermelon: "/drink-image-watermelon.jpeg",
	drinkImageYellow: "/drink-image-yellow.jpeg",
	drinkImageRedPurple: "/drink-image-red-background-purple.jpeg",
    drinksImageRedBlue: "/drinks-image-red-background-blue.jpeg",
    drinksImageCream: "/drinks-image-cream.jpeg",
    drinksImageSunset: "/drinks-image-sunset.jpeg",
    drinkImageGreen: "/drink-image-green.jpeg",
    drinksImageBabyLucasSignage: "/drinks-image-baby-lucas-signage.jpeg",
    drinksImageMany: "/drinks-image-many.jpeg",

	// Cheers & Signage
	cheersSignage: "/drinks-image-cheers-signage.jpeg",
    signageImagePurple: "/signage-image-purple.jpeg",
	cheersWide: "/drinks-image-cheers-wide.jpeg",

    //People
    peopleImage1: "/people-image-1.jpeg",
    peopleImage2: "/people-image-2.jpeg",
    peopleImage3: "/people-image-3.jpeg",

	// Videos
	barVideoShort: "/bar-video-short.mp4",
    drinkImageRed: "/drink-image-red.mp4",
	drinksVideoShortPan: "/drinks-video-short-pan-to-signage.mp4",
};

/**
 * Get asset path
 * @param key - The asset key from assetRoutes
 * @returns Full public asset path
 */
export const getAsset = (key: keyof typeof assetRoutes): string => {
	return assetRoutes[key];
};
