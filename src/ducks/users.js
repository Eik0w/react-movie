import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'users',
	initialState: {
		list: {
			1: {
				id: 1,
				name: 'Bryan',
				firstName: 'Schmitt',
				picture: 'https://admin2.oxatis.com/Images/OxStaff/SCHMITT-bryan.jpg',
			},
			2: {
				id: 2,
				name: 'Uschi',
				firstName: 'Buchinger',
				picture: 'https://admin2.oxatis.com/Images/OxStaff/BUCHINGER-uschi.jpg',
			},
			3: {
				id: 3,
				name: 'César',
				firstName: 'Tailleur',
				picture: 'https://admin2.oxatis.com/Images/OxStaff/TAILLEUR-cesar.jpg',
			},
			4: {
				id: 4,
				name: 'Nicolas',
				firstName: 'Foudral',
				picture: 'https://admin2.oxatis.com/Images/OxStaff/FOUDRAL-nicolas.jpg',
			},
		},
		editMode: false,
	},
	reducers: {
		updateUser: (state, { payload }) => {
			const { id, data } = payload;
			state.list[id] = { ...state.list[id], ...data };
		},
		toggleEditMode: (state, { payload }) => {
			state.editMode = !state.editMode;
		},
	},
});

const { reducer, actions } = slice;

// selectors
const getSlice = state => state.users;

export const getUsers = createSelector([getSlice], data => data.list);
export const getEditMode = createSelector([getSlice], data => data.editMode);

export const { updateUser, toggleEditMode } = actions;

export default reducer;
