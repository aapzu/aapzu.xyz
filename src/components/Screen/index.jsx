import React, { Component } from 'react'
import { Col, Input } from 'reactstrap'
import Pixel from './Pixel'
import letters from '../../../config/letters.js'
import styles from './screen.pcss'

export default class Screen extends Component {
	constructor() {
		super()
		this.state = {
			screen: (new Array(5)).fill(undefined)
				.map(() => (new Array(5)).fill(false))
		}
		this.drawLetter = this.drawLetter.bind(this)
	}
	
	render() {
		return (
			<Col md={{
				size: 6,
				offset: 3
			}} lg={{
				size: 4,
				offset: 4
			}} className={styles.screen}>
				{this.state.screen.map((row, rowIndex) => (
					<div className={styles.pixelRow} key={`row${rowIndex}`}>
						{row.map((pixel, pixelIndex) => (
							<Pixel
								x={pixelIndex}
								y={rowIndex}
								key={`pixel${rowIndex}${pixelIndex}`}
								state={ this.state.screen[rowIndex][pixelIndex] }
							/>
						))}
					</div>
				))}
				<Input className={styles.letterInput} onKeyUp={this.drawLetter} />
			</Col>
		)
	}
	
	drawLetter(e) {
		const letter = e.key.toUpperCase()
		const letterMap = letters[letter]
		let map = (new Array(5)).fill(undefined)
			.map(() => (new Array(5)).fill(false))
		if (letterMap) {
			e.target.value = letter
			for (let l of letterMap) {
				map[l[1]][l[0]] = true
			}
		}
		this.setMap(map)
	}
	
	setMap(map) {
		if (map.length != 5 && map.find(i => i.length != 5) !== undefined) {
			throw 'Invalid map!'
		}
		this.setState({
			screen: map.map(row => row.map(item => !!item))
		})
	}
	
	setPixel(x, y, state) {
		let newScreen = this.state.screen
		newScreen[y].splice(x, 1, state)
		this.setMap(newScreen)
	}
}