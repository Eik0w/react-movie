import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { imageBaseUrl } from '../config/themoviedb';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import emptyPoster from '../asset/emptyPoster.png';
import Rating from '@material-ui/lab/Rating';
import { find } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFavorites,
	getFavoritesTv,
	setFavorite,
} from '../ducks/favoritesMovies';
import { Star, StarBorder } from '@material-ui/icons';

const useStyles = makeStyles(
	theme => ({
		root: {},

		title: {
			color: '#fff',
			padding: '10px',
		},
		paperMovie: {
			overflow: 'hidden',
		},
		img: {
			width: '100%',
			height: '100%',
		},
		onePaper: {
			display: 'flex',
			boxShadow: '0 0 5px rgba(0,0,0,0.7)',
			border: '1px solid #666666',
			position: 'relative',
			overflow: 'hidden',
			transition: 'all 0.5s linear',
			'&:hover $hover': {
				display: 'block',
			},
		},
		link: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: 50,
		},
		hover: {
			display: 'none',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: 'rgba(0,0,0,0.7)',
			color: 'white',
		},
		contentLike: {
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'flex-start',
			padding: '10px',
			justifyContent: 'space-between',
			height: '33.333%',
		},
		contentLeft: {
			flex: '0 1 auto',
		},
		contentRight: {
			flex: '0 1 auto',
			justifyContent: 'flex-end',
			position: 'relative',
			zIndex: 150,
		},
		titleMovie: {
			alignItems: 'center',
			width: '100%',
			height: '43.333%',
			color: '#fff',
			fontSize: '16px',
			textAlign: 'center',
			textTransform: 'uppercase',
			fontFamily: 'arial',
		},
		linkMovie: {
			alignSelf: 'flex-end',
			width: '100%',
			height: '20.333%',
			textAlign: 'center',
			'& a': {
				fontSize: '18px',
				textTransform: 'uppercase',
				padding: '10px',
				border: '1px solid white',
				fontFamily: 'arial',
				color: '#fff',
				textDecoration: 'none',
			},
		},
	}),
	{ name: 'MoviePaper' }
);

function MoviePaper(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const queryFav = useSelector(getFavorites);
	const queryTvFav = useSelector(getFavoritesTv);
	const handlerFavClick = movie => e => {
		dispatch(setFavorite(movie));
	};

	const isFav = elem => {
		console.warn('isFav la', elem);
		console.warn('ISFAV LIST LA', queryFav);
		console.warn('-----------------------------------------------------');
		let ZeQuery = [];
		if (elem.storeName === 'favoritesMovies') {
			ZeQuery = queryFav;
		} else {
			ZeQuery = queryTvFav;
		}
		if (
			find(ZeQuery, o => {
				return o.id.toString() === elem.id.toString();
			})
		) {
			return (
				<FavoriteIcon
					color={'secondary'}
					onClick={handlerFavClick(props.elem)}
				/>
			);
		} else {
			return <FavoriteIcon onClick={handlerFavClick(props.elem)} />;
		}
	};

	return (
		<div className={classes.onePaper}>
			<img
				className={classes.img}
				src={
					props.elem.poster_path
						? `${imageBaseUrl}${props.elem.poster_path}`
						: emptyPoster
				}
			/>
			<div className={classes.hover}>
				<div className={classes.contentLike}>
					<div className={classes.likeLeft}>
						<Rating
							name="size-medium"
							value={props.elem.vote_average / 2}
							size="small"
							precision={0.1}
							readOnly
						/>
					</div>
					<div className={classes.likeRight}>{isFav(props.elem)}</div>
				</div>
				<div className={classes.titleMovie}>
					{props.type === 'serie' ? props.elem.name : props.elem.title}
				</div>
				<div className={classes.linkMovie}>
					<a href={props.type + '/' + props.type + '-' + props.elem.id}>
						Voir la fiche
					</a>
				</div>
			</div>
		</div>
	);
}

export default MoviePaper;
