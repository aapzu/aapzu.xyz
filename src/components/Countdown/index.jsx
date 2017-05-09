
import React, {Component, PropTypes} from 'react'
import {Row} from 'reactstrap'
import styles from './countdown.pcss'

import moment from 'moment'
import CountdownSettings from './CountdownSettings'
import Bitmap from '../CharacterBitmap'

import url from 'url'

const getOrigin = () => typeof window !== 'undefined' ? window.location.origin : ''

export default class Countdown extends Component {
	constructor(props) {
		super(props)

        const date = !isNaN((new Date(parseFloat(this.props.location.query.date))).getTime()) ? new Date(parseFloat(this.props.location.query.date)).getTime() : new Date().getTime()
		
		this.count = this.count.bind(this)
		this.onDateChange = this.onDateChange.bind(this)
        this.getDuration = this.getDuration.bind(this)
		
        this.state = {
			date,
	        link: this.getLink(date)
        }
        this.state.duration = this.getDuration()
		
	}
	componentDidMount() {
		setTimeout(this.count, Date.now() % 1000)
	}
	componentWillUnmount() {
		clearTimeout(this.countTimeout)
	}
	getLink(date) {
        return `${url.resolve(getOrigin(), this.props.location.pathname)}?date=${date}`
	}
	getDuration() {
        const now = moment()
        const then = moment(this.state.date, 'x')
		return moment.duration(then.diff(now))
	}
	count() {
		this.setState({
			duration: this.getDuration()
		})
		this.countTimeout = setTimeout(() => this.count(), 100)
	}
	onDateChange(date) {
		this.setDateAndLink(date)
		setTimeout(() => {
			console.log(this.state)
            this.context.router.push(this.state.link)
		})
	}
	setDateAndLink(date) {
        this.setState({
            date,
            link: this.getLink(date)
        })
	}
	render() {
		return (
			<div className={styles.countdownContainer}>
				<div className={styles.settingsContainer}>
					<CountdownSettings
						date={this.state.date}
						onChange={this.onDateChange}
					    link={this.state.link}
					/>
				</div>
				<div className={styles.countdownInnerContainer}>
					<Row className="text-center">
						<div className={[styles.dayContainer, styles.timeContainer].join(' ')}>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={Math.floor(Math.abs(this.state.duration.asDays()) / 100).toString()}
								/>
							</div>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={Math.floor((Math.abs(this.state.duration.asDays()) % 100) / 10).toString()}
								/>
							</div>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={(Math.abs(this.state.duration.days()) % 10).toString()}
								    text="days"
								/>
							</div>
						</div>
					</Row>
					<Row className={styles.dateTimeContainer}>
						<div className={[styles.timeContainer, styles.withDots].join(' ')}>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={Math.floor(Math.abs(this.state.duration.hours()) / 10).toString()}
								/>
							</div>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={(Math.abs(this.state.duration.hours()) % 10).toString()}
								    text="hrs"
								/>
							</div>
						</div>
						<div className={[styles.timeContainer, styles.withDots].join(' ')}>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={Math.floor(Math.abs(this.state.duration.minutes()) / 10).toString()}
								/>
							</div>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={(Math.abs(this.state.duration.minutes()) % 10).toString()}
								    text="min"
								/>
							</div>
						</div>
						<div className={styles.timeContainer}>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={Math.floor(Math.abs(this.state.duration.seconds()) / 10).toString()}
								/>
							</div>
							<div className={styles.bitmapContainer}>
								<Bitmap
									char={(Math.abs(this.state.duration.seconds()) % 10).toString()}
									text="sec"
								/>
							</div>
						</div>
					</Row>
					<Row>
						<p className={`text-center ${styles.dateLabel}`}>
							{this.state.duration.asMilliseconds() > 0 ? 'to' : 'from'}
						</p>
					</Row>
					<Row className="text-center">
						<p className={`text-center ${styles.dateLabel}`}>
	                        {moment(this.state.date, 'x').format('DD.MM.YYYY HH:mm')}
						</p>
					</Row>
				</div>
			</div>
		)
	}
}

const {object} = PropTypes

Countdown.contextTypes = {
    router: object.isRequired
}
