import React, { Component } from 'react'
import { Col } from 'reactstrap'
import Pixel from './Pixel'
import styles from './screen.pcss'

export default class Screen extends Component {
	constructor() {
		super()
		this.state = {
			screen: Array(5).fill(Array(5).fill(false))
		}
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
								onClick={() => this.setPixel(pixelIndex, rowIndex, !this.state.screen[rowIndex][pixelIndex])}
							/>
						))}
					</div>
				))}
				<button onClick={() => this.print()}>Print</button>
			</Col>
		)
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
	
	print() {
		let pixels = []
		for (let row in this.state.screen) {
			for (let pixel in this.state.screen[row]) {
				if (this.state.screen[row][pixel]) {
					pixels.push([parseFloat(pixel), parseFloat(row)])
				}
			}
		}
		console.info(JSON.stringify(pixels))
	}
}