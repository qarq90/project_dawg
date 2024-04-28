export const gameTabs = (slug) => [
    { href: `/game/about/${slug}`, label: 'ABOUT' },
    { href: `/game/scrnshot/${slug}`, label: 'SCREENSHOTS' },
    { href: `/game/req/${slug}`, label: 'REQUIREMENTS' },
    { href: `/game/reviews/${slug}`, label: 'REVIEWS' },
];

export const imageCaptions = [
    "A captivating scene",
    "Exploring a new world",
    "Engaging in intense activity",
    "Interacting with characters",
    "Discovering hidden secrets",
    "Experiencing thrilling moments",
    "Enjoying the immersive atmosphere",
    "Encountering epic challenges",
    "Unveiling mysteries",
    "Embarking on an adventure",
];
//
// const url = 'https://games-details.p.rapidapi.com/730/reviews/toprated/30';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '58c61158b4msh9378a7744c948a6p19cb20jsnf067e4ff84b1',
// 		'X-RapidAPI-Host': 'games-details.p.rapidapi.com'
// 	}
// };
//
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
//
// await fetch(url, options);