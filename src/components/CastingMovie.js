import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCredisMovie, getCreditsVideo } from '../ducks/movieDetail';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import { imageBaseUrl } from '../config/themoviedb';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { getCredisTv, getCreditsTv } from '../ducks/serieDetail';
import CastingCard from './CastingCard';

const useStyles = makeStyles(
	theme => ({
		root: {},
		media: {
			height: 180,
			backgroundSize: 'cover',
		},
		card: {
			flex: '0 0 18%',
			margin: '0 1%',
		},
		castingContainer: {
			background: '#eeeeee',
			paddingBottom: '20px',
		},
		title: {
			padding: '10px',
		},
	}),
	{ name: 'CastingMovie' }
);

function CastingMovie(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	let selector = [];

	if (props.type === 'serie') {
		selector = getCredisTv;
	} else {
		selector = getCredisMovie;
	}
	const queryCasting = useSelector(selector);

	useEffect(() => {
		if (props.type === 'film') {
			dispatch(getCreditsVideo(props.id));
		} else {
			dispatch(getCreditsTv(props.id));
		}
	}, []);
	return (
		<Grid container className={classes.castingContainer}>
			{props.real && (
				<>
					<Typography variant="h6" className={classes.title}>
						Production
					</Typography>
					<Grid item xs={12}>
						<Grid container justify="flex-start">
							{props.real.map((elem, key) => {
								return <CastingCard elem={elem} key={key} type="real" />;
							})}
							{props.prod &&
								props.prod.map((elem, key) => {
									return <CastingCard elem={elem} key={key} type="prod" />;
								})}
						</Grid>
					</Grid>
				</>
			)}

			{queryCasting.length && (
				<Typography variant={'h6'} className={classes.title}>
					Casting
				</Typography>
			)}
			<Grid item xs={12}>
				<Grid container justify="flex-start">
					{queryCasting.length &&
						queryCasting.map((elem, key) => {
							return <CastingCard elem={elem} key={key} type="actor" />;
						})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default CastingMovie;
