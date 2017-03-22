
import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import DefaultHeadMeta from './components/DefaultHeadMeta'
import Nav from './components/Nav'
import Footer from './components/Footer'

export default class Page extends Component {
	render() {
		return (
			<div id="page-content-wrapper">
				<DefaultHeadMeta />
				<Nav />
					{this.props.children}
				<Footer />
			</div>
		)
	}
}

Page.propTypes = {
	children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)])
}