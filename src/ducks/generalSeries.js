import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiBaseUrl, apiKey } from '../config/themoviedb';
import axios from 'axios';

const slice = createSlice({
	name: 'generalSeries',
	initialState: {
		topSeries: [],
	},
	reducers: {
		setTopSeries: (state, { payload }) => {
			state.topSeries = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const getTopSeries = () => dispatch => {
	axios
		.get(apiBaseUrl + 'tv/top_rated', {
			params: {
				api_key: apiKey,
				language: 'fr-FR',
			},
		})
		.then(({ data }) => {
			console.log('coucou je suis les top Movies', data);
			if (data && data.results) {
				data.results.forEach(elem => {
					elem.title = elem.name;
					elem.original_title = elem.original_name;
					elem.release_date = elem.first_air_date;
				});
				dispatch(setTopSeries(data.results.slice(0, 17)));
			} else dispatch(setTopSeries([]));
		});
};

// selectors
const getSlice = state => state.generalSeries;
export const getTop = createSelector([getSlice], data => data.topSeries);

//Export reducers
export const { setTopSeries } = actions;

export default reducer;
