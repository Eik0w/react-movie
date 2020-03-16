import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(
	theme => ({
		root: {},
		tvShow: {
			display: 'flex',
			flex: '0 0 11.5%',
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
	{ name: 'ResultSearchSkeleton' }
);

const results = [
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
];

function ResultSearchSkeleton(props) {
	const { className } = props;
	const classes = useStyles(props);
	return (
		<Grid container className={classes.container}>
			<Grid item xs={12}>
				{results && results.length ? (
					<Skeleton
						variant="rect"
						width="40%"
						height={20}
						className={classes.title}
					/>
				) : null}

				<Grid container justify="flex-start">
					{results.map((elem, key) => {
						return (
							key === 1 && (
								<Skeleton
									className={classes.contentBig}
									variant="rect"
									height={500}
								/>
							)
						);
					})}
					<div className={classes.contentSmall}>
						{results.map((elem, key) => {
							return (
								key !== 1 &&
								key <= 16 && (
									<Skeleton
										key={key}
										className={classes.tvShow}
										variant="rect"
										height={250}
									/>
								)
							);
						})}
					</div>
					<div className={classes.contentAll}>
						{results.map((elem, key) => {
							return (
								key > 16 && (
									<Skeleton
										key={key}
										className={classes.tvShow}
										variant="rect"
										height={250}
									/>
								)
							);
						})}
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ResultSearchSkeleton;
