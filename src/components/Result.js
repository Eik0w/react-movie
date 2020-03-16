import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { getMoviesResult, getPending } from '../ducks/movies';
import { useSelector } from 'react-redux';
import { imageBaseUrl } from '../config/themoviedb';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import MovieCard from './MovieCard';
import { getFavorites, getLastFav } from '../ducks/favoritesMovies';
import Snackbar from '@material-ui/core/Snackbar';
import { find } from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';
import ResultFav from './ResultFav';
import ResultMovies from './ResultMovies';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(
	theme => ({
		root: {
			color: 'white',
			padding: 10,
			display: 'flex',
			flex: '0 1 auto',
			borderBottom: '1px solid #484848',
		},
		result: {},
		tatata: {
			color: 'white',
		},
	}),
	{ name: 'Result' }
);

function Result(props) {
	const { className } = props;
	const classes = useStyles(props);

	console.warn('les props la', props.type, arguments);
	if (props.type === 'movie') {
		console.warn('BALESCOUILLES', props.match.params.id);
	}
	console.log(arguments);
	//let { id } = useParams();
	//console.warn('FGZEGEZRGERG', id);
	// watcher dernier favoris ajouté



	return (
		<>
			{props.type === 'fav' && <ResultFav type={props.match.params.id} />}
			{props.type === 'searchMovie' && <ResultMovies type={'film'} />}
		</>
	);
}

export default Result;
