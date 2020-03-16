import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMovieDetail,
	getMovieResult,
	getVideoResult,
} from '../ducks/movieDetail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import MovieCard from './MovieCard';
import { imageBaseUrl } from '../config/themoviedb';
import VideosMovie from './VideosMovie';
import SimilarsMovie from './SimilarsMovie';
import { ListItemAvatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LanguageIcon from '@material-ui/icons/Language';
import LinkIcon from '@material-ui/icons/Link';
import StarsIcon from '@material-ui/icons/Stars';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import CastingMovie from './CastingMovie';
import { AccountTree, DateRange, MovieFilter, Title } from '@material-ui/icons';
import { getTvDetail, getTvResult } from '../ducks/serieDetail';
import MyListDetail from './MyListDetail';
import Seasons from './Seasons';

const useStyles = makeStyles(
	theme => ({
		root: {},
		modalContainer: {
			background: '#333',
		},
		containInfo: {
			width: '100%',
			display: 'flex',
			flexWrap: 'wrap',
		},
		picture: {
			flex: '0 1 32%',
			'& img': {
				maxWidth: '100%',
				maxHeight: '100%',
				width: '100%',
				height: 'auto',
				position: 'sticky',
				top: '60px',
			},
		},
		infos: {
			flex: '0 1 68%',
			background: '#fff',
			color: '#484848',
		},
		overview: {
			padding: '10px',
			color: '#484848',
		},
		containList: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		list: {
			flex: '1 1 32%',
			margin: '0.5%',
		},
		header: {
			position: 'sticky',
			top: 0,
		},
		title: {
			color: '#484848',
			padding: '10px',
			textTransform: 'uppercase',
		},
	}),
	{ name: 'MovieDetail' }
);

function MovieDetail(props) {
	console.warn('----- CACACA', props.match.params);
	const { className } = props;
	const dispatch = useDispatch();
	const classes = useStyles(props);
	let selector = {};
	let tabList = [];
	if (props.match.params.type === 'film') {
		selector = getMovieResult;
		tabList = [
			{
				icon: <Title />,
				content: 'original_title',
				text: 'Titre original',
				type: 'text',
			},
			{
				icon: <AttachMoneyIcon />,
				content: 'budget',
				text: 'Budget du film',
				type: '$',
			},
			{
				icon: <AttachMoneyIcon />,
				content: 'revenue',
				text: 'Revenu du film',
				type: '$',
			},
			{
				icon: <LanguageIcon />,
				content: 'original_language',
				text: 'Langue original',
				type: 'text',
			},
			{
				icon: <LinkIcon />,
				content: 'homepage',
				text: 'Site Officiel',
				type: 'link',
			},
			{
				icon: <StarsIcon />,
				content: 'vote_average',
				text: 'Note spectateur',
				type: 'rate',
			},
			{
				icon: <CategoryIcon />,
				content: 'genres',
				text: 'Genres',
				type: 'cat',
			},
		];
	} else {
		tabList = [
			{
				icon: <MovieFilter />,
				content: 'in_production',
				text: 'Production',
				type: 'bool',
			},
			{
				icon: <DateRange />,
				content: 'first_air_date',
				text: 'Première diffusion',
				type: 'text',
			},
			{
				icon: <LinkIcon />,
				content: 'homepage',
				text: 'Site Officiel',
				type: 'link',
			},
			{
				icon: <AccountTree />,
				content: 'number_of_seasons',
				text: 'Nombre de saisons',
				type: 'text',
			},
			{
				icon: <StarsIcon />,
				content: 'vote_average',
				text: 'Note spectateur',
				type: 'rate',
			},
			{
				icon: <CategoryIcon />,
				content: 'genres',
				text: 'Genres',
				type: 'cat',
			},
		];
		selector = getTvResult;
	}
	const queryMovie = useSelector(selector);
	useEffect(() => {
		if (selector === getMovieResult) {
			dispatch(getMovieDetail(props.match.params.id));
		} else {
			dispatch(getTvDetail(props.match.params.id));
		}
	}, []);

	return (
		<div className={classes.modalContainer}>
			<div className={classes.containInfo}>
				<div className={classes.picture}>
					<img src={`${imageBaseUrl}${queryMovie.poster_path}`} />
				</div>
				<div className={classes.infos}>
					<Typography variant="h5" className={classes.title}>
						{props.match.params.type === 'film' && queryMovie.title}
						{props.match.params.type === 'serie' && queryMovie.name}
					</Typography>
					<div className={classes.overview}>
						<Typography variant={'button'}>{queryMovie.overview}</Typography>
					</div>
					<List className={classes.containList}>
						{tabList.map((elem, key) => {
							return (
								<MyListDetail
									className={classes.list}
									icon={elem.icon}
									key={key}
									text={elem.text}
									content={queryMovie[elem.content]}
									type={elem.type}
								/>
							);
						})}
					</List>

					<CastingMovie
						className={classes.casting}
						id={props.match.params.id}
						type={props.match.params.type}
						real={queryMovie.created_by}
						prod={queryMovie.networks}
					/>

					{props.match.params.type === 'serie' && queryMovie.seasons && (
						<Seasons elem={queryMovie.seasons} />
					)}

					<div>
						<VideosMovie
							id={props.match.params.id}
							type={props.match.params.type}
						/>
					</div>
					<div>
						<SimilarsMovie
							id={props.match.params.id}
							type={props.match.params.type}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetail;
