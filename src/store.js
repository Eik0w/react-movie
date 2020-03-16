import { configureStore } from '@reduxjs/toolkit';
import movies from './ducks/movies';
import favoritesMovies from './ducks/favoritesMovies';
import movieDetail from './ducks/movieDetail';
import generalMovies from './ducks/generalMovies';
import generalSeries from './ducks/generalSeries';
import serieDetail from './ducks/serieDetail';

const store = configureStore({
	reducer: {
		movies,
		favoritesMovies,
		movieDetail,
		generalMovies,
		generalSeries,
		serieDetail,
	},
});

export default store;
