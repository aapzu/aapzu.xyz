import React, { Component, PropTypes } from 'react'
import Pixel from './Pixel'
import characters from '../../../config/characters.js'
import styles from './bitmap.pcss'

export default class Bitmap extends Component {
	render() {
		return (
			<div className={`${styles.bitmap} ${this.props.className || ''}`}>
				{this.getMapByCharacter(this.props.char).map((row, rowIndex) => (
					<div className={styles.pixelRow} key={`row${rowIndex}`}>
						{row.map((pixel, pixelIndex) => (
							<Pixel
								x={pixelIndex}
								y={rowIndex}
								key={`pixel${rowIndex}${pixelIndex}`}
								state={ pixel }
							    letter={this.getLetterByText(pixelIndex, rowIndex)}
							/>
						))}
					</div>
				))}
			</div>
		)
	}
	
	getLetterByText(x, y) {
		if (!this.props.text) {
			return ''
		}
		const maxI = 5 * 5
		const currentI = y * 5 + x
		const length = this.props.text.length
		const i = currentI - (maxI - length)
		return i >= 0 ? this.props.text[i] : ''
	}
	
	getMapByCharacter(char) {
		let map = (new Array(5)).fill(undefined)
			.map(() => (new Array(5)).fill(false))
		if (char) {
			const charMap = characters[char] || characters[char.toUpperCase()]
			if (charMap) {
				for (let l of charMap) {
					map[l[1]][l[0]] = true
				}
			}
		}
		return map
	}
}

const {string} = PropTypes
Bitmap.propTypes = {
	char: string,
	className: string,
	text: string
}