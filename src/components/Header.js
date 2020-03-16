import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Favorite, Home, Menu, Search } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import MyMenu from './MyMenu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getNbFav, setInitData } from '../ducks/favoritesMovies';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(
	theme => ({
		root: {},
		header: {
			height: '60px',
			width: '100%',
			background: '#f2f2f2',
			color: '#484848',
			display: 'flex',
			alignItems: 'center',
			top: 0,
		},
		title: {
			flex: '1 1 auto',
			justifyContent: 'flex-end',
			justifySelf: 'flex-end',
			marginRight: '10px',
		},
	}),
	{ name: 'Header' }
);

function Header(props) {
	const { className } = props;
	const classes = useStyles(props);

	const handleDrawerOpen = e => {
		console.warn('on ouvre le menu');
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setInitData());
	}, []);

	const nbfav = useSelector(getNbFav);

	return (
		<AppBar position="fixed" color="secondary">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					My React Movies Database
				</Typography>
				<IconButton href="/" color="inherit" title="Page D'accueil">
					<Home />
				</IconButton>
				<IconButton href="/search" color="inherit" title="Recherche">
					<Search />
				</IconButton>
				<IconButton href="/favorites" color="inherit" title="Mes Favoris">
					<Badge badgeContent={nbfav} color="primary">
						<Favorite />
					</Badge>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
