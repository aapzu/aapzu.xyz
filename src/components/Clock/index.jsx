
import React, {Component} from 'react'
import {Col} from 'reactstrap'
import styles from './clock.pcss'

export default class Clock extends Component {
	constructor() {
		super()
		this.mountDate = new Date()
	}
	render() {
		const rotate = {
			hour: `rotate(${(this.mountDate.getHours() / 12 + (this.mountDate.getMinutes() / 60) / 12) * 360}deg)`,
			minute: `rotate(${(this.mountDate.getMinutes() / 60 + (this.mountDate.getSeconds() / 60) / 60) * 360}deg)`,
			second: `rotate(${this.mountDate.getSeconds() / 60 * 360}deg)`
		}
		return (
			<div className="container-fluid container">
				<Col xs={12} md={{
					size: 8,
					offset: 2
				}} lg={{
					size: 6,
					offset: 3
				}}>
					<div className={styles.clock}>
						<div className={[styles.markContainer, styles.container].join(' ')}>
							{[...Array(60)].map((x, i) =>
								<div key={i} className={styles.minuteMark} style={{
									transform: `rotate(${i * 6}deg) translate(-50%, -100%)`
								}} />
							)}
						</div>
						<div id="hourContainer" className={styles.container} ref={i => this.hourArm = i} style={{
							transform: rotate.hour
						}}>
							<div className={styles.hourArm}/>
						</div>
						<div id="minuteContainer" className={styles.container} ref={i => this.minuteArm = i} style={{
							transform: rotate.minute
						}}>
							<div className={styles.minuteArm}/>
						</div>
						<div id="secondContainer" className={styles.container} ref={i => this.secondArm = i} style={{
							transform: rotate.second
						}}>
							<div className={styles.secondArm}/>
						</div>
					</div>
				</Col>
			</div>
		)
	}
}