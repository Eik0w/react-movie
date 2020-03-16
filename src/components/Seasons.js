import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import MoviePaper from './MoviePaper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { imageBaseUrl } from '../config/themoviedb';

const useStyles = makeStyles(
	theme => ({
		root: {},
		seasonsContainer: {
			background: '#e3e3e3',
		},
		title: {
			padding: '10px',
		},
		imgSeason: {
			width: 'auto',
			height: 'auto',
			maxWidth: '100%',
		},
		season: {
			flex: '0 1 10.5%',
			margin: '0 0.5% 1% 0.5% ',
			position: 'relative',
			flexWrap: 'wrap',
			display: 'flex',
			'&:hover $seasonName': {
				display: 'flex',
			},
		},
		seasonName: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			color: 'white',
			display: 'none',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'rgba(0, 0, 0, 0.7)',
		},
		text: {
			padding: '10px',
			border: '1px solid white',
		},
	}),
	{ name: 'Seasons' }
);

function Seasons(props) {
	const { className } = props;
	const classes = useStyles(props);
	console.log('COUCOU JE SUIS LES SAISONS ', props);
	return (
		<Grid container className={classes.seasonsContainer}>
			<Typography variant="h6" className={classes.title}>
				Saisons
			</Typography>
			<Grid item xs={12}>
				<Grid container justify="flex-start">
					{props.elem.map((elem, key) => {
						return (
							<div className={classes.season}>
								<img
									className={classes.imgSeason}
									src={imageBaseUrl + elem.poster_path}
									title={elem.name}
								/>
								<div className={classes.seasonName}>
									<Typography className={classes.text} variant="button">
										{' '}
										{elem.name}{' '}
									</Typography>
								</div>
							</div>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Seasons;
