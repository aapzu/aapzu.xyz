import React, { Component } from 'react'
import { Col, Row, Button, FormGroup, Form, Input, Label } from 'reactstrap'
import Switch from 'react-bootstrap-switch'
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css'
import Bitmap from '../CharacterBitmap'
import styles from './screen.pcss'

export default class Screen extends Component {
	constructor() {
		super()
		this.state = {
			char: '',
			mode: 'text'
		}
		this.drawChars = this.drawChars.bind(this)
	}
	
	render() {
		return (
			<div className={[styles.screen, 'container'].join(' ')}>
				<Row>
					<Col md={{
						size: 6,
						offset: 3
					}}>
						<Bitmap char={this.state.char}/>
					</Col>
				</Row>
				<Row className="align-items-center">
					<Col md={3} xs={12} className={styles.switcherContainer}>
						<Switch animation={true} onText="Text" offText="Type" onColor="default" onChange={(el, state) => {
							this.setState({
								mode: state ? 'text' : 'type'
							})
						}}/>
					</Col>
					<Col md={6} xs={12} className={styles.inputContainer}>
						<Row>
							{this.state.mode === 'text' ?
								<Form inline onSubmit={this.drawChars} className={styles.optionForm}>
									<Col xs={12}>
										<FormGroup>
											<Label>Characters</Label>
											<Input
												className={styles.letterInput}
												getRef={i => this.input = i}
												autoFocus="true"
											/>
										</FormGroup>
									</Col>
									<Col xs={6}>
										<FormGroup>
											<Label>Interval (ms)</Label>
											<Input
												type="number"
												placeholder="1000"
												getRef={i => this.intervalInput = i}
											/>
										</FormGroup>
									</Col>
									<Col xs={6} className={styles.startButtonContainer}>
										<FormGroup>
											<Label>&nbsp;</Label>
											<Button>Start</Button>
										</FormGroup>
									</Col>
								</Form>
								:
								<Col xs={{
									size: 6,
									offset: 3
								}}>
									<FormGroup className={styles.charInputGroup}>
										<Label>Type some characters</Label>
										<Input
										    autoFocus={true}
										    onKeyPress={e => {
										        e.preventDefault()
										        this.setState({
												    char: e.key
											    })
											    e.target.value = e.key
										    }}
										    className={styles.charInput}
										/>
									</FormGroup>
								</Col>
							}
						</Row>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	
	drawChars(e) {
		e.preventDefault()
		const string = this.input.value
		const draw = (i) => {
			this.setState({
				char: string[i] || ' '
			})
			if (i < string.length) {
				this.timeout = setTimeout(() => {
					draw(i + 1)
				}, this.intervalInput.value || 1000)
			}
		}
		draw(0)
	}
}