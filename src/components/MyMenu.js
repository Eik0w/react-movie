import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import {
	ChevronLeft,
	Favorite,
	Home,
	Inbox,
	Mail,
	Menu,
	Search,
} from '@material-ui/icons';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(
	theme => ({
		root: {},
		btn: {
			padding: '10px',
			fontSize: '20px',
			marginLeft: '5px',
		},
	}),
	{ name: 'MyMenu' }
);

function MyMenu(props) {
	const { className } = props;
	const classes = useStyles(props);
	const [open, setOpen] = useState(false);
	const tabMenu = [
		{
			name: 'Accueil',
			icon: <Home />,
			url: '/',
		},
		{
			name: 'Recherche',
			icon: <Search />,
			url: '/search',
		},
		{
			name: 'Favoris',
			icon: <Favorite />,
			url: '/favorites',
		},
	];

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<>
			<IconButton
				edge="start"
				className={classes.menuButton}
				color="inherit"
				aria-label="menu"
				onClick={handleDrawerOpen}
			>
				<Menu />
			</IconButton>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<List>
					{tabMenu.map((elem, key) => (
						<Link to={elem.url} key={key}>
							<ListItem button key={key}>
								<ListItemIcon>{elem.icon}</ListItemIcon>
								<ListItemText primary={elem.name} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
			</Drawer>
		</>
	);
}

export default MyMenu;
