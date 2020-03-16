import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getLastFav } from '../ducks/favoritesMovies';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(
	theme => ({
		root: {},
		alert: {
			background: '#4caf50',
			'& *': {
				background: '#4caf50',
			},
		},
		delete: {
			background: '#f44336',
			'& *': {
				background: '#f44336',
			},
		},
	}),
	{ name: 'NotificationFav' }
);

function NotificationFav(props) {
	const { className } = props;
	const classes = useStyles(props);

	const [message, setMessage] = useState('');
	const [isDelete, setIsDelete] = useState(false);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const lastFav = useSelector(getLastFav);
	const alertDelete = clsx({
		[classes.alert]: !isDelete,
		[classes.delete]: isDelete,
	});

	const handleClose = e => {
		setAlertIsOpen(false);
	};

	useEffect(() => {
		let type = '';
		let name = '';
		if (lastFav.storeName === 'favoritesMovies') {
			type = 'Le film';
			name = lastFav.last.elem.title;
		} else {
			type = 'La série';
			name = lastFav.last.elem.name;
		}

		if (lastFav.last.isAdd) {
			setMessage(`${type} ${name} a bien été ajouté à vos favoris.`);
			setIsDelete(false);
		} else {
			setMessage(`${type} ${name} a bien été retiré à vos favoris.`);
			setIsDelete(true);
		}
		if (lastFav.last.elem.title) setAlertIsOpen(true);
	}, [lastFav]);

	return (
		<Snackbar
			className={alertDelete}
			open={alertIsOpen}
			autoHideDuration={2000}
			onClose={handleClose}
			message={message}
		/>
	);
}

export default NotificationFav;
