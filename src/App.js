import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import Navbar from './navbar/Navbar';
import Home from './home/Home';


injectTapEventPlugin();

var App = React.createClass({
	render: function(){
		return (
		<div>
			<div>
			<Navbar />
			</div>
		<div>{this.props.children}</div>			
		</div>
		)
	}
})

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>

		</Route>
	</Router>
), document.getElementById('root'))