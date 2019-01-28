import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Page from './Page'
import App from './components/App'
import Clock from './components/Clock'
import Screen from './components/Screen'
import Countdown from './components/Countdown'
import TableDemo from './components/TableDemo'
import Text from './components/Text'
import ImageColorSort from './components/ImageColorSort'

export default (
	<Router history={hashHistory}>
		<Route component={ Page }>
			<Route path="/" component={ App }/>
			<Route path="/clock" component={ Clock }/>
			<Route path="/screen" component={ Screen }/>
			<Route path="/countdown" component={ Countdown }/>
			<Route path="/animatedtable" component={ TableDemo }/>
			<Route path="/aapzu" component={ Text }/>
			<Route path="/imageColorSort" component={ ImageColorSort }/>
		</Route>
	</Router>
)
