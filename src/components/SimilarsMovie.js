import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarMovie, getSimilarVideo } from '../ducks/movieDetail';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import Grid from '@material-ui/core/Grid';
import { getSimilarTv, getSimilarTvs } from '../ducks/serieDetail';

const useStyles = makeStyles(
	theme => ({
		root: {},
		title: {
			padding: '10px',
		},
		similar: {
			flex: '0 1 31%',
			margin: '1%',
		},
		similarContainer: {
			background: '#eee',
			'& .MuiCard-root': {
				flex: '0 1 31%',
				margin: '1%',
			},
		},
	}),
	{ name: 'SimilarsMovie' }
);

function SimilarsMovie(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	let selector = [];
	if (props.type === 'serie') {
		selector = getSimilarTvs;
	} else {
		selector = getSimilarMovie;
	}
	const querySimilars = useSelector(selector);

	useEffect(() => {
		if (props.type === 'film') dispatch(getSimilarVideo(props.id));
		else dispatch(getSimilarTv(props.id));
	}, []);

	return (
		<Grid container className={classes.similarContainer}>
			{querySimilars.length && (
				<Typography variant={'h6'} className={classes.title}>
					Les films similaires :
				</Typography>
			)}

			<Grid item xs={12}>
				<Grid container justify="flex-start">
					{querySimilars.length &&
						querySimilars.map((elem, key) => {
							return (
								<MovieCard
									className={classes.similar}
									elem={elem}
									key={key}
									type={props.type}
								/>
							);
						})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SimilarsMovie;
