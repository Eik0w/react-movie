import { createSlice, createSelector } from '@reduxjs/toolkit';
import { difference, find, filter, remove } from 'lodash';
const slice = createSlice({
	name: 'favoritesMovies',
	initialState: {
		list: [],
		tvList: [],
		count: 0,
		last: {
			elem: {},
			isAdd: {},
		},
	},
	reducers: {
		setInitData: (state, { payload }) => {
			state.list = JSON.parse(localStorage.getItem('favoritesMovies'))
				? JSON.parse(localStorage.getItem('favoritesMovies'))
				: [];
			state.tvList = JSON.parse(localStorage.getItem('favoritesTv'))
				? JSON.parse(localStorage.getItem('favoritesTv'))
				: [];
			state.count = state.list.length + state.tvList.length;
		},
		setMovieToFav: (state, { payload }) => {
			state.list = JSON.parse(localStorage.getItem('favoritesMovies'));
			state.tvList = JSON.parse(localStorage.getItem('favoritesTv'));
			console.warn('le fav est set la', state.list);
		},
		setLastFav: (state, { payload }) => {
			console.log('ici on va remplir le dernier favorie par ', payload);
			state.last = payload;
		},
	},
});

const { reducer, actions } = slice;

//side effect
export const setFavorite = elem => dispatch => {
	console.log('coucou le side', elem);
	var newElem = elem;
	let storeName = '';
	if (elem.name) {
		storeName = 'favoritesTv';
	} else {
		storeName = 'favoritesMovies';
	}
	const favs = JSON.parse(localStorage.getItem(storeName));
	if (favs) {
		console.log('on a get la', favs);
		let isFound = find(favs, elem);
		//Suppréssion d'un favorie
		if (isFound) {
			let newFavs = remove(favs, n => {
				return n.id !== isFound.id;
			});
			localStorage.setItem(storeName, JSON.stringify(newFavs));
			dispatch(setLastFav({ elem: elem, isAdd: false, storeName }));
		} else {
			favs.push(elem);
			localStorage.setItem(storeName, JSON.stringify(favs));
			dispatch(setLastFav({ elem: elem, isAdd: true, storeName }));
		}
	} else {
		var movie = [];
		movie.push(newElem);
		localStorage.setItem(storeName, JSON.stringify(movie));
		dispatch(setLastFav({ elem: elem, isAdd: true, storeName }));
	}
	dispatch(setMovieToFav());
};

// selectors
const getSlice = state => state.favoritesMovies;
export const getFavorites = createSelector([getSlice], data => data.list);
export const getFavoritesTv = createSelector([getSlice], data => data.tvList);
export const getLastFav = createSelector([getSlice], data => data);
export const getNbFav = createSelector([getSlice], data => data.count);

//Export reducers
export const { setMovieToFav, setLastFav, setInitData } = actions;

export default reducer;
