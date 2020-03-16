import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoviePaper from './MoviePaper';

const useStyles = makeStyles(
	theme => ({
		root: {},
	}),
	{ name: 'PaperSearch' }
);

function PaperSearch(props) {
	const { className } = props;
	const classes = useStyles(props);

	return (
		<Grid container className={classes.container}>
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
		</Grid>
	);
}

export default PaperSearch;
