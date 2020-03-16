import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTop, getTopSeries } from '../ducks/generalSeries';
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
		contentBig: {
			flex: '0 1 18.5%',
			margin: '0.5% 1% 0.5% 0%',
		},
		contentSmall: {
			flex: '0 0 79.5%',
			margin: '0.5%',
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'center',
		},
		container: {
			background: '#eeeeee',
			color: '#484848',
		},
		title: {
			padding: '10px',
		},
	}),
	{ name: 'TopSeries' }
);

function TopSeries(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTopSeries());
	}, []);

	const topSeries = useSelector(getTop);

	console.warn('CACACACA', topSeries[1]);
	const Zelem = topSeries[1];

	return (
		<Grid container className={classes.container}>
			<Grid item xs={12}>
				<Typography variant="h5" className={classes.title}>
					Séries les mieux notées de tous les temps :
				</Typography>
				<Grid container justify="flex-start">
					<div className={classes.contentSmall}>
						{topSeries.map((elem, key) => {
							return (
								key !== 1 && (
									<div key={key} className={classes.tvShow}>
										<MoviePaper elem={elem} type="serie" />
									</div>
								)
							);
						})}
					</div>
					{topSeries &&
						topSeries.map((elem, key) => {
							return (
								key === 1 && (
									<div className={classes.contentBig}>
										<MoviePaper elem={elem} type="serie" />
									</div>
								)
							);
						})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default TopSeries;
