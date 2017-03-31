
import React, {Component} from 'react'
import styles from './pixel.pcss'

export default class Pixel extends Component {
	render() {
		return (
			<div className={[styles.pixel, (this.props.state ? styles.on : '')].join(' ')} onClick={this.props.onClick}>
				<div className={styles.pixelFront}/>
				<div className={styles.pixelBack}/>
			</div>
		)
	}
}

Pixel.propTypes = {
	state: React.PropTypes.bool,
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	onClick: React.PropTypes.func
}