import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoviePaper from './MoviePaper';

const useStyles = makeStyles(
	theme => ({
		root: {},
		tvShow: {
			display: 'flex',
			flex: '0 0 11.5%',
			maxHeight: '270px',
			margin: '0% 0.5% 0.5% 0.5%',
		},
		container: {
			color: '#484848',
		},
		contentBig: {
			display: 'flex',
			flex: '0 1 18.5%',
			margin: '0.5% 0% 0.5% 1%',
		},
		contentSmall: {
			flex: '0 0 79.5%',
			margin: '0.5%',
			display: 'flex',
			flexWrap: 'wrap',
		},
		contentAll: {
			flex: '0 1 100%',
			margin: '0.5%',
			display: 'flex',
			flexWrap: 'wrap',
		},
		title: {
			padding: '10px',
		},
	}),
	{ name: 'ResultSearch' }
);

function ResultSearch(props) {
	const { className } = props;
	const classes = useStyles(props);
	return (
		<Grid container className={classes.container}>
			{props.results && props.results.length ? (
				<Grid item xs={12}>
					{props.results && props.results.length ? (
						<Typography variant="h5" className={classes.title}>
							{props.title}
						</Typography>
					) : null}

					<Grid container justify="flex-start">
						{props.results.map((elem, key) => {
							return (
								key === 1 && (
									<div className={classes.contentBig}>
										<MoviePaper elem={elem} type={props.type} />
									</div>
								)
							);
						})}
						<div className={classes.contentSmall}>
							{props.results.map((elem, key) => {
								return (
									key !== 1 &&
									key <= 16 && (
										<div key={key} className={classes.tvShow}>
											<MoviePaper elem={elem} type={props.type} />
										</div>
									)
								);
							})}
						</div>
						<div className={classes.contentAll}>
							{props.results.map((elem, key) => {
								return (
									key > 16 && (
										<div key={key} className={classes.tvShow}>
											<MoviePaper elem={elem} type={props.type} />
										</div>
									)
								);
							})}
						</div>
					</Grid>
				</Grid>
			) : null}
		</Grid>
	);
}

export default ResultSearch;
