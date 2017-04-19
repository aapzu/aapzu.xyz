
import React, {Component, PropTypes} from 'react'
import styles from './pixel.pcss'

export default class Pixel extends Component {
	render() {
		return (
			<div className={[styles.pixel, (this.props.state ? styles.on : '')].join(' ')} onClick={this.props.onClick}>
				{[styles.pixelFront, styles.pixelBack].map(c => (
					<div className={c} key={c}>
						{this.props.letter && this.props.letter !== '' &&
							<p className={styles.pixelLabel}>{this.props.letter}</p>
						}
					</div>
				))}
			</div>
		)
	}
}

const {bool, number, string, func} = PropTypes
Pixel.propTypes = {
	state: bool,
	x: number,
	y: number,
	letter: string,
	onClick: func
}