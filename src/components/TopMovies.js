import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTop, getTopMovies } from '../ducks/generalMovies';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import MoviePaper from './MoviePaper';

const useStyles = makeStyles(
	theme => ({
		root: {},
		tvShow: {
			flex: '0 0 11.5%',
			margin: '0% 0.5% 0.5% 0.5%',
		},
		container: {
			background: '#fff',
			color: '#484848',
		},
		contentBig: {
			flex: '0 1 18.5%',
			margin: '0.5% 0% 0.5% 1%',
		},
		contentSmall: {
			flex: '0 0 79.5%',
			margin: '0.5%',
			display: 'flex',
			flexWrap: 'wrap',
		},
		title: {
			padding: '10px',
		},
	}),
	{ name: 'TopMovies' }
);

function TopMovies(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTopMovies());
	}, []);
	const topMovies = useSelector(getTop);

	return (
		<Grid container className={classes.container}>
			<Grid item xs={12}>
				<Typography variant="h5" className={classes.title}>
					Films les mieux notés de tous les temps :
				</Typography>
				<Grid container justify="flex-start">
					{topMovies &&
						topMovies.map((elem, key) => {
							return (
								key === 1 && (
									<div className={classes.contentBig}>
										<MoviePaper elem={elem} type="film" />
									</div>
								)
							);
						})}
					<div className={classes.contentSmall}>
						{topMovies.map((elem, key) => {
							return (
								key !== 1 && (
									<div key={key} className={classes.tvShow}>
										<MoviePaper elem={elem} type="film" />
									</div>
								)
							);
						})}
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default TopMovies;
