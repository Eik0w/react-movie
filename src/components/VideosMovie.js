import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMovieDetail,
	getMovieVideo,
	getVideoResult,
} from '../ducks/movieDetail';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { darken } from '@material-ui/core';
import { getTvVideo, getVideoResultTv } from '../ducks/serieDetail';

const useStyles = makeStyles(
	theme => ({
		root: {},
		containVideo: {
			display: 'flex',
			flexWrap: 'wrap',
			width: '95%',
			margin: '0 auto',
			justifyContent: 'flex-start',
		},
		card: {
			flex: '0 1 18%',
			margin: '1%',
			'& iframe': {
				border: '0px none',
			},
		},
		movieContainer: {
			background: '#d6d6d6',
		},
		title: {
			padding: '10px',
		},
	}),
	{ name: 'VideosMovie' }
);

function VideosMovie(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	let selector = [];
	if (props.type === 'serie') {
		selector = getVideoResultTv;
	} else {
		selector = getVideoResult;
	}

	var queryVideo = useSelector(selector);

	useEffect(() => {
		if (props.type === 'serie') {
			dispatch(getTvVideo(props.id));
		} else {
			dispatch(getMovieVideo(props.id));
		}
	}, []);
	return (
		<Grid container className={classes.movieContainer}>
			{queryVideo.length && (
				<Typography variant={'h6'} className={classes.title}>
					Les vidéos associées :
				</Typography>
			)}
			<Grid item xs={12}>
				<Grid container justify="flex-start">
					{queryVideo.length ? (
						queryVideo.map((elem, key) => {
							return (
								<Card className={classes.card} key={key}>
									<CardActionArea>
										<CardMedia
											component="iframe"
											alt="video"
											height="150"
											src={`https://www.youtube.com/embed/${elem.key}`}
										/>
										<CardContent>
											<Typography
												gutterBottom
												variant="body2"
												color="textSecondary"
												component="h2"
											>
												{elem.name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							);
						})
					) : (
						<Typography variant={'button'}>
							{' '}
							Aucune vidéo associé à ce contenu{' '}
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default VideosMovie;
