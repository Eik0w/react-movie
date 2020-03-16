import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';
import {
	getMoviesResult,
	getPending,
	getPendingSeries,
	getSeriesResult,
} from '../ducks/movies';
import ResultSearch from './ResultSearch';
import ResultSearchSkeleton from './ResultSearchSkeleton';

const useStyles = makeStyles(
	theme => ({
		root: {},
		movieContainer: {
			background: '#eeeeee',
			minHeight: '40%',
		},
		serieContainer: {
			background: '#d6d6d6',
			minHeight: '40%',
		},
	}),
	{ name: 'ResultMovies' }
);

function ResultMovies(props) {
	const { className } = props;
	const classes = useStyles(props);
	const queryMovies = useSelector(getMoviesResult);
	const queryTv = useSelector(getSeriesResult);
	const isPending = useSelector(getPending);
	const isPendingSeries = useSelector(getPendingSeries);
	return (
		<>
			<div className={classes.movieContainer}>
				{!isPending ? (
					<ResultSearch
						type="film"
						results={queryMovies}
						title="Les films de votre recherche :"
					/>
				) : (
					<ResultSearchSkeleton />
				)}
			</div>
			<div className={classes.serieContainer}>
				{!isPendingSeries ? (
					<ResultSearch
						type="serie"
						results={queryTv}
						title="Les séries de votre recherche :"
					/>
				) : (
					<ResultSearchSkeleton />
				)}
			</div>
		</>
	);
}

export default ResultMovies;
