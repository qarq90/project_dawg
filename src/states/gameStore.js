import create from 'zustand';

const useGameStore = create((set) => ({
	gameId: 0,
	gameDetails: null,
	gameTrailer: null,
	gameDescription: [],
	gameScreenshots: null,
	gameReviews: null,
	gameName: null,
	setGameId: (gameId) => set(() => ({gameId})),
	setGameDetails: (gameDetails) => set(() => ({gameDetails})),
	setGameTrailer: (gameTrailer) => set(() => ({gameTrailer})),
	setGameDescription: (gameDescription) => set(() => ({gameDescription})),
	setGameScreenshots: (gameScreenshots) => set(() => ({gameScreenshots})),
	setGameReviews: (gameReviews) => set(() => ({gameReviews})),
	setGameName: (gameName) => set(() => ({gameName})),
}));

export default useGameStore;
