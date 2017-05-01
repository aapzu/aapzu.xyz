
import React, {Component, PropTypes} from 'react'
import styles from './text.pcss'

export default class Text extends Component {
    constructor() {
        super()
        this.state = {
            charPositions: {},
            mousePosition: {},
            textShadows: {},
            blurRadius: 10
        }
        this.calculateShadow = this.calculateShadow.bind(this)
    }
    componentDidMount() {
        document.addEventListener('mousemove', e => {
            const mousePosition = {
                top: e.clientY,
                left: e.clientX
            }
            const textShadows = {}
            Object.keys(this.refs).forEach(key => {
                textShadows[key] = this.calculateShadow(this.refs[key])
            })
            this.setState({
                mousePosition: mousePosition,
                textShadows: textShadows
            })
        })
        
    }
    calculateShadow(char) {
        const charPosition = char.getBoundingClientRect()
        const mousePosition = this.state.mousePosition
        const charMiddle = {
            top: charPosition.top + charPosition.height / 2,
            left: charPosition.left + charPosition.width / 2,
        }
        const mouseDiffFromChar = {
            top: charMiddle.top - mousePosition.top,
            left: charMiddle.left - mousePosition.left
        }
        const y = mouseDiffFromChar.top * 0.1
        const x = mouseDiffFromChar.left * 0.05
        return `${x}px ${y}px ${this.state.blurRadius}px red`
    }
    render() {
        return (
            <div className={styles.textContainer}>
                <span ref="char0" style={{
                    textShadow: this.state.textShadows['char0']
                }}>a</span>
                <span ref="char1" style={{
                    textShadow: this.state.textShadows['char1']
                }}>a</span>
                <span ref="char2" style={{
                    textShadow: this.state.textShadows['char2']
                }}>p</span>
                <span ref="char3" style={{
                    textShadow: this.state.textShadows['char3']
                }}>z</span>
                <span ref="char4" style={{
                    textShadow: this.state.textShadows['char4']
                }}>u</span>
            </div>
        )
    }
}