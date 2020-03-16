import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiBaseUrl, apiKey } from '../config/themoviedb';
import axios from 'axios';

const slice = createSlice({
	name: 'movieDetail',
	initialState: {
		detail: {},
		video: {},
		similar: {},
		casting: {},
	},
	reducers: {
		setMovieResult: (state, { payload }) => {
			state.detail = payload;
		},
		setMovieVideo: (state, { payload }) => {
			state.video = payload;
		},
		setMovieSimilar: (state, { payload }) => {
			state.similar = payload;
		},
		setCreditsMovie: (state, { payload }) => {
			state.casting = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const getMovieDetail = query => dispatch => {
	console.log('coucou ajax', query);
	axios
		.get(apiBaseUrl + 'movie/' + query, {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou je suis ici dans la requette detail', data);
			if (data) dispatch(setMovieResult(data));
			else dispatch(setMovieResult([]));
		});
};

export const getMovieVideo = query => dispatch => {
	console.log('coucou ajax', query);
	axios
		.get(apiBaseUrl + 'movie/' + query + '/videos', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou video ajax', data);
			if (data && data.results) dispatch(setMovieVideo(data.results));
			else dispatch(setMovieVideo([]));
		});
};

export const getSimilarVideo = query => dispatch => {
	axios
		.get(apiBaseUrl + 'movie/' + query + '/similar', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou SIMILAR ajax', data);
			if (data && data.results)
				dispatch(setMovieSimilar(data.results.slice(0, 9)));
			else dispatch(setMovieSimilar([]));
		});
};

export const getCreditsVideo = query => dispatch => {
	axios
		.get(apiBaseUrl + 'movie/' + query + '/credits', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou SIMILAR ajax', data);
			if (data && data.cast) dispatch(setCreditsMovie(data.cast.slice(0, 5)));
			else dispatch(setCreditsMovie([]));
		});
};

// selectors
const getSlice = state => state.movieDetail;
export const getMovieResult = createSelector([getSlice], data => data.detail);
export const getVideoResult = createSelector([getSlice], data => data.video);
export const getSimilarMovie = createSelector([getSlice], data => data.similar);
export const getCredisMovie = createSelector([getSlice], data => data.casting);
//Export reducers
export const {
	setMovieResult,
	setMovieVideo,
	setMovieSimilar,
	setCreditsMovie,
} = actions;

export default reducer;
