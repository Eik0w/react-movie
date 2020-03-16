import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {
	getMovies,
	getSeries,
	resetMovie,
	setPending,
	setPendingSeries,
	resetSerie,
} from '../ducks/movies';
import { useDispatch } from 'react-redux';
import { setInitData } from '../ducks/favoritesMovies';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import FavoriteIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Result from './Result';
import { useDebounce } from 'use-lodash-debounce';

const useStyles = makeStyles(
	theme => ({
		root: {},
		input: {
			background: '#fff',
			flex: '1 1 100%',
			color: '#484848',
			textTransform: 'uppercase',
			fontSize: '22px',
			paddingLeft: 10,
		},
		form: {
			background: '#fff',
			height: 56,
			display: 'flex',
			flex: '1 1 auto',
			flexWrap: 'wrap',
		},
	}),
	{ name: 'Search' }
);

function Search(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');
	let isOkay = useDebounce(searchValue, 400);
	useEffect(() => {
		dispatch(setInitData());
	}, []);

	useEffect(() => {
		if (!searchValue.length) {
			dispatch(setPendingSeries(false));
			dispatch(setPending(false));
			dispatch(resetMovie());
			dispatch(resetSerie());
			console.log('on pending plus la');
		} else {
			dispatch(getSeries(searchValue));
			dispatch(getMovies(searchValue));
		}
	}, [isOkay]);
	const onInputChange = e => {
		setSearchValue(e.currentTarget.value);
	};

	//Template
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<form className={classes.form}>
					<InputBase
						className={classes.input}
						placeholder="Tapez le nom de votre film ou série"
						onChange={onInputChange}
					/>
				</form>
			</div>
			<Result type="searchMovie" />
		</div>
	);
}

export default Search;
