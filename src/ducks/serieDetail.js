import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiBaseUrl, apiKey } from '../config/themoviedb';
import axios from 'axios';

const slice = createSlice({
	name: 'serieDetail',
	initialState: {
		detail: {},
		video: {},
		similar: {},
		casting: {},
	},
	reducers: {
		setTvResult: (state, { payload }) => {
			state.detail = payload;
		},
		setTvVideo: (state, { payload }) => {
			state.video = payload;
		},
		setTvSimilar: (state, { payload }) => {
			state.similar = payload;
		},
		setCreditsTv: (state, { payload }) => {
			state.casting = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const getTvDetail = query => dispatch => {
	console.log('coucou ajax', query);
	axios
		.get(apiBaseUrl + 'tv/' + query, {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou je suis ici dans la requette detail', data);
			if (data) dispatch(setTvResult(data));
			else dispatch(setTvResult([]));
		});
};

export const getTvVideo = query => dispatch => {
	console.log('coucou ajax', query);
	axios
		.get(apiBaseUrl + 'tv/' + query + '/videos', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou video ajax', data);
			if (data && data.results) dispatch(setTvVideo(data.results));
			else dispatch(setTvVideo([]));
		});
};

export const getSimilarTv = query => dispatch => {
	axios
		.get(apiBaseUrl + 'tv/' + query + '/similar', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou SIMILAR ajax', data);
			if (data && data.results) {
				data.results.forEach(elem => {
					elem.title = elem.name;
					elem.original_title = elem.original_name;
					elem.release_date = elem.first_air_date;
				});
				dispatch(setTvSimilar(data.results.slice(0, 9)));
			} else dispatch(setTvSimilar([]));
		});
};

export const getCreditsTv = query => dispatch => {
	axios
		.get(apiBaseUrl + 'tv/' + query + '/credits', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			if (data && data.cast) dispatch(setCreditsTv(data.cast.slice(0, 5)));
			else dispatch(setCreditsTv([]));
		});
};

// selectors
const getSlice = state => state.serieDetail;
export const getTvResult = createSelector([getSlice], data => data.detail);
export const getVideoResultTv = createSelector([getSlice], data => data.video);
export const getSimilarTvs = createSelector([getSlice], data => data.similar);
export const getCredisTv = createSelector([getSlice], data => data.casting);
//Export reducers
export const { setTvResult, setTvVideo, setTvSimilar, setCreditsTv } = actions;

export default reducer;
