import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TopMovies from './TopMovies';
import TopSeries from './TopSeries';
import Snackbar from "@material-ui/core/Snackbar";
import {useSelector} from "react-redux";
import {getLastFav} from "../ducks/favoritesMovies";

const useStyles = makeStyles(
	theme => ({
		root: {},
		title: {
			padding: '10px',
			color: '#fff',
		},
	}),
	{ name: 'HomePage' }
);

function HomePage(props) {
	const { className } = props;
	const classes = useStyles(props);




	return (
		<Grid container>
			<Grid item xs={12}>
				<TopMovies />
				<TopSeries />
			</Grid>
		</Grid>

	);
}

export default HomePage;
