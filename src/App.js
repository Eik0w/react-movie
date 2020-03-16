import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './store';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme';
import Search from './components/Search';
import Result from './components/Result';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import HomePage from './components/HomePage';
import Header from './components/Header';
import ResultFav from './components/ResultFav';
import NotificationFav from './components/NotificationFav';

const useStyles = makeStyles(
	theme => ({
		'@global': {
			body: {
				background: '#1f2326',
				padding: '60px 0 0 0',
				margin: 0,
			},
		},
		header: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		search: {
			flex: '0 1 80%',
		},
		menu: {
			flex: '0 1 auto',
		},
		menuElem: {
			flex: '1 0 auto',
			borderLeft: '1px solid #e3e3e3',
		},
	}),
	{ name: 'App' }
);

function App() {
	const classes = useStyles();

	//const [value, setValue] = useState('searchMovie');

	// J'ai le droit ?
	//document.getElementsByTagName('body')[0].className = classes.body;

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Header />
					<NotificationFav />

					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/favorites">
							<ResultFav />
						</Route>
						<Route path="/search">
							<Search />
						</Route>
						<Route path="/film/:type-:id" component={MovieDetail}></Route>
						<Route path="/serie/:type-:id" component={MovieDetail}></Route>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
