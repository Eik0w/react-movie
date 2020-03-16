import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFavorites,
	getFavoritesTv,
	setInitData,
} from '../ducks/favoritesMovies';

const useStyles = makeStyles(
	theme => ({
		root: {},
		title: {
			padding: '10px',
			color: '#fff',
		},
	}),
	{ name: 'ResultFav' }
);

function ResultFav(props) {
	const { className } = props;
	const classes = useStyles(props);

	const queryFav = useSelector(getFavorites);
	console.warn(queryFav);
	const queryTvFav = useSelector(getFavoritesTv);
	console.warn('coucou tv fav', queryTvFav);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h6" className={classes.title}>
					Liste de vos Films favoris :
				</Typography>
				<Grid container justify="flex-start">
					{queryFav.map((elem, key) => {
						return <MovieCard key={elem.key} elem={elem} type="result" />;
					})}
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6" className={classes.title}>
					Liste de vos series favorites :
				</Typography>
				<Grid container justify="flex-start">
					{queryTvFav.map((elem, key) => {
						return <MovieCard key={elem.key} elem={elem} type="result" />;
					})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ResultFav;
