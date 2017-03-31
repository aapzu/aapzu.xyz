import React, { Component } from 'react'
import Pixel from './Pixel'
import characters from '../../../../config/characters.js'
import styles from './bitmap.pcss'

export default class Bitmap extends Component {
	render() {
		return (
			<div className={styles.bitmap}>
				{this.getMapByCharacter(this.props.char).map((row, rowIndex) => (
					<div className={styles.pixelRow} key={`row${rowIndex}`}>
						{row.map((pixel, pixelIndex) => (
							<Pixel
								x={pixelIndex}
								y={rowIndex}
								key={`pixel${rowIndex}${pixelIndex}`}
								state={ pixel }
							/>
						))}
					</div>
				))}
			</div>
		)
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

Bitmap.propTypes = {
	char: React.PropTypes.string
}