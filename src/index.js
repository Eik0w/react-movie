import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js');
	});
}
*/

ReactDOM.render(<App />, document.getElementById('root'));
