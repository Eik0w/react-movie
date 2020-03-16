import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiBaseUrl, apiKey } from '../config/themoviedb';
import axios from 'axios';

const slice = createSlice({
	name: 'generalMovies',
	initialState: {
		topMovie: [],
	},
	reducers: {
		setTopMovie: (state, { payload }) => {
			state.topMovie = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const getTopMovies = () => dispatch => {
	axios
		.get(apiBaseUrl + 'movie/top_rated', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou je suis les top Movies', data);
			if (data && data.results)
				dispatch(setTopMovie(data.results.slice(0, 17)));
			else dispatch(setTopMovie([]));
		});
};

// selectors
const getSlice = state => state.generalMovies;
export const getTop = createSelector([getSlice], data => data.topMovie);

//Export reducers
export const { setTopMovie } = actions;

export default reducer;
