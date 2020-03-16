import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { imageBaseUrl } from '../config/themoviedb';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
	theme => ({
		root: {},
		media: {
			height: 180,
			backgroundSize: 'cover',
		},
		card: {
			flex: '0 0 18%',
			margin: '0 1%',
		},
	}),
	{ name: 'CastingCard' }
);

function CastingCard(props) {
	const { className } = props;
	const classes = useStyles(props);
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={
						props.type === 'prod'
							? imageBaseUrl + props.elem.logo_path
							: imageBaseUrl + props.elem.profile_path
					}
					title={props.elem.name}
				/>
				<CardContent color="primary">
					<Typography gutterBottom variant="h5" component="h2">
						{props.elem.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{props.type === 'real' && 'Réalisateur'}
						{props.type === 'actor' &&
							'Dans le rôle de : ' + props.elem.character}
						{props.type === 'prod' && 'Société de production'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CastingCard;
