import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiBaseUrl, apiKey } from '../config/themoviedb';
import axios from 'axios';

const slice = createSlice({
	name: 'movies',
	initialState: {
		list: [],
		series: [],
		isPending: false,
		isPendingSeries: false,
	},
	reducers: {
		updateMovies: (state, { payload }) => {
			state.list = { ...state.list, ...payload };
		},
		setMoviesResult: (state, { payload }) => {
			state.list = payload;
		},
		setTvResult: (state, { payload }) => {
			state.series = payload;
		},
		resetMovie: (state, { payload }) => {
			state.list = [];
		},
		resetSerie: (state, { payload }) => {
			state.series = [];
		},
		setPending: (state, { payload }) => {
			state.isPending = payload;
		},
		setPendingSeries: (state, { payload }) => {
			state.isPendingSeries = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const getMovies = query => dispatch => {
	dispatch(actions.setPending(true));
	axios
		.get(apiBaseUrl + 'search/movie', {
			params: {
				api_key: apiKey,
				query,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			dispatch(actions.setPending(false));
			if (data && data.results) dispatch(actions.setMoviesResult(data.results));
			else dispatch(actions.setMoviesResult([]));
		});
};

export const getSeries = query => dispatch => {
	dispatch(actions.setPendingSeries(true));
	axios
		.get(apiBaseUrl + 'search/tv', {
			params: {
				api_key: apiKey,
				query,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			dispatch(actions.setPendingSeries(false));
			console.warn('AAAAAAAAAAAAAAAAAAAAAAAAAA', data.results);
			if (data && data.results) dispatch(actions.setTvResult(data.results));
			else dispatch(actions.setTvResult([]));
		});
};

// selectors
const getSlice = state => state.movies;
export const getMoviesResult = createSelector([getSlice], data => data.list);
export const getSeriesResult = createSelector([getSlice], data => data.series);
export const getPending = createSelector([getSlice], data => data.isPending);
export const getPendingSeries = createSelector(
	[getSlice],
	data => data.isPendingSeries
);

//Export reducers
export const {
	setMoviesResult,
	setPending,
	resetMovie,
	setTvResult,
	resetSerie,
	setPendingSeries,
} = actions;

export default reducer;
