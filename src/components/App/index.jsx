
import React, { Component } from 'react'
import {Link} from 'react-router'

import './app.pcss'

export default class App extends Component {
	render() {
		return (
			<div className="container-fluid container">
				<div>
					<Link to="clock">Clock</Link>
				</div>
				<div>
					<Link to="screen">Screen</Link>
				</div>
				<div>
					<Link to="countdown">Countdown</Link>
				</div>
				<div>
					<Link to="animatedtable">Animated Table (not ready)</Link>
				</div>
				<div>
					<Link to="aapzu">Text</Link>
				</div>
			</div>
		)
	}
}