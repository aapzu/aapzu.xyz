
import React, {Component, PropTypes} from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import DefaultHeadMeta from './components/DefaultHeadMeta'

import styles from './general-styles.pcss'

export default class Page extends Component {
	render() {
		return (
			<div id={styles.pageContentWrapper}>
				<DefaultHeadMeta />
				{this.props.children}
			</div>
		)
	}
}

const {element, arrayOf, oneOfType, string} = PropTypes
Page.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
	className: string
}