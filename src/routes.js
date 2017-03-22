import React from 'react'
import { Router, Route, Redirect } from 'react-router'

import Page from './Page'
import App from './components/App'

export default (
	<Router>
        <Route component={ Page }>
            <Route path="/" component={ App } />
        </Route>
		<Redirect from="*" to="/"/>
	</Router>
)
