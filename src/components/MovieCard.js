import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { imageBaseUrl } from '../config/themoviedb';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Card from '@material-ui/core/Card';
import { getMovies } from '../ducks/movies';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFavorites,
	getFavoritesTv,
	setFavorite,
} from '../ducks/favoritesMovies';
import { find } from 'lodash';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import MovieDetail from './MovieDetail';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(
	theme => ({
		root: {},
		media: {
			height: 550,
			overflow: 'hidden',
		},
		card: {
			width: '23%',
			margin: '1%',
		},
		isFav: {
			color: 'hotpink',
		},
	}),
	{ name: 'MovieCard' }
);

function MovieCard(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const queryFav = useSelector(getFavorites);
	const queryTvFav = useSelector(getFavoritesTv);
	const [openDialog, setOpenDialog] = useState(false);
	const skeletonTab = ['', '', '', '', '', '', '', ''];

	const handlerFavClick = movie => e => {
		dispatch(setFavorite(movie));
	};

	const handleDialogOpen = () => {
		setOpenDialog(true);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const isFav = elem => {
		let ZeQuery = [];
		console.log('GRERGEHGERG GRTEZRT RGR ER ', elem);
		if (elem.storeName == 'favoritesMovies') {
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
				<IconButton aria-label="favorie" onClick={handlerFavClick(props.elem)}>
					<FavoriteIcon color={'secondary'} />
				</IconButton>
			);
		} else {
			return (
				<IconButton aria-label="favorie" onClick={handlerFavClick(props.elem)}>
					<FavoriteIcon />
				</IconButton>
			);
		}
	};

	return (
		<>
			{props.type !== 'skeleton' ? (
				<>
					<Card className={classes.card}>
						{props.elem.vote_average ? (
							<CardHeader
								avatar={
									<>
										<CircularProgress
											variant="static"
											value={props.elem.vote_average * 10}
										/>
									</>
								}
								action={isFav(props.elem)}
								title={props.elem.title}
								subheader={`${props.elem.original_title} - ${props.elem.release_date}`}
							/>
						) : (
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										?
									</Avatar>
								}
								action={isFav(props.elem)}
								title={props.elem.title}
								subheader={`${props.elem.original_title} - ${props.elem.release_date} - ${props.elem.favorite}`}
							/>
						)}
						{props.elem.poster_path ? (
							<CardMedia
								className={classes.media}
								image={`${imageBaseUrl}${props.elem.poster_path}`}
								title={props.elem.title}
							/>
						) : (
							<CardMedia
								className={classes.media}
								image="https://lightning.od-cdn.com/25.2.6-build-2331-master/public/img/no-cover_en_US.jpg"
								title={props.elem.title}
							/>
						)}

						<CardContent>
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-label="Expand"
								>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Lire le synopsis
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{props.elem.overview
											? props.elem.overview
											: 'Synopsis non disponible'}
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</CardContent>
						<CardActions>
							<Button
								color="primary"
								size="small"
								href={'/film/' + props.type + '-' + props.elem.id}
							>
								Voir la fiche du film
							</Button>
						</CardActions>
					</Card>
				</>
			) : (
				skeletonTab.map((elem, key) => {
					return (
						<Card key={key} className={classes.card}>
							<CardHeader
								avatar={<Skeleton variant="circle" width={40} height={40} />}
								title={<Skeleton variant="text" width="40%" />}
								subheader={<Skeleton variant="text" width="80%" />}
								action={
									<IconButton aria-label="favorie">
										<FavoriteIcon />
									</IconButton>
								}
							/>
							<Skeleton variant="rect" className={classes.media} />

							<CardContent>
								<Skeleton height={10} style={{ marginBottom: 6 }} />
								<Skeleton height={10} width="80%" />
							</CardContent>
						</Card>
					);
				})
			)}
		</>
	);
}

export default MovieCard;
