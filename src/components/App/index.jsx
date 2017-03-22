
import React, { Component } from 'react'

import './app.pcss'

import Clock from '../Clock'

export default class App extends Component {
	render() {
		return (
			<div className="container-fluid container">
				<Clock />
			</div>
		)
	}
}