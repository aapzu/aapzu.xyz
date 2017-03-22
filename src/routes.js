import React from 'react'
import { Router, Route } from 'react-router'

import Page from './Page'
import App from './components/App'
import Clock from './components/Clock'

export default (
	<Router>
        <Route component={ Page }>
            <Route path="/" component={ App } />
            <Route path="/clock" component={ Clock } />
        </Route>
	</Router>
)
