
import React, {Component, PropTypes} from 'react'
import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import ClipboardButton from 'react-clipboard.js'
import moment from 'moment'
import 'input-moment/dist/input-moment.css'
import './ownDatetimeStyles.css'
import InputMoment from 'input-moment'
import FontAwesome from 'react-fontawesome'
import styles from './countdownSettings.pcss'

export default class CountdownSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            moment: moment(),
            date: new Date(props.date)
        }
        this.openOrCloseDate = this.openOrCloseDate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    openOrCloseDate(isOpen) {
        isOpen = isOpen !== undefined ? isOpen : !this.state.dateOpen
        this.setState({
            dateOpen: isOpen
        })
        if (isOpen) {
            this.openOrCloseLink(false)
        }
    }
    openOrCloseLink(isOpen) {
        isOpen = isOpen !== undefined ? isOpen : !this.state.linkOpen
        this.setState({
            linkOpen: isOpen !== undefined ? isOpen : !this.state.linkOpen
        })
        if (isOpen) {
            this.openOrCloseDate(false)
        }
    }
    handleChange(date) {
        this.setState({
            date: date.toDate()
        })
    }
    handleSave() {
        this.props.onChange(this.state.date.getTime())
        this.openOrCloseDate(false)
        this.openOrCloseLink(false)
    }
    render() {
        return (
            <div
                className={styles.settingsContainer}
                style={{
                    top: this.props.top,
                    left: this.props.left,
                    bottom: this.props.bottom,
                    right: this.props.right
                }}
            >
                <div className={styles.settingContainer}>
                    <FontAwesome name="external-link" size="2x" onClick={() => this.openOrCloseLink()}/>
                    {this.state.linkOpen && (
                        <div className={[styles.menuContainer, styles.linkMenuContainer].join(' ')}>
                            <InputGroup>
                                <InputGroupAddon>
                                    <FontAwesome name="external-link">
                                        <ClipboardButton component="a" data-clipboard-text={this.props.link} />
                                    </FontAwesome>
                                </InputGroupAddon>
                                <Input readOnly className={styles.link} value={this.props.link}/>
                            </InputGroup>
                        </div>
                    )}
                </div>
                <div className={styles.settingContainer}>
                    <FontAwesome name="gear" onClick={() => this.openOrCloseDate()} size="2x"/>
                    {this.state.dateOpen && (
                        <div className={styles.menuContainer}>
                            <InputMoment
                                moment={this.state.moment}
                                onChange={this.handleChange}
                                onSave={this.handleSave}
                                prevMonthIcon="fa fa-caret-left" // default
                                nextMonthIcon="fa fa-caret-right"
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const {number, func} = PropTypes
CountdownSettings.propTypes = {
    left: number,
    right: number,
    top: number,
    bottom: number,
    onChange: func.isRequired
}