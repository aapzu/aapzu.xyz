
import React, { Component } from 'react'
import styles from './imageColorSort.pcss'

export default class ImageColorSort extends Component {
    constructor() {
        super()
        this.state = {
            width: null,
            height: null
        }
        this.onFileChange = this.onFileChange.bind(this)
    }
    onFileChange({target}) {
        var ctx = this.canvas.getContext('2d')
        const reader = new FileReader()
        const file = target.files[0]
        const img = new Image()
        img.onload = () => {
            
            this.setState({
                width: img.width,
                height: img.height
            })
            
            // draw image
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
            
            for (let y = 0; y < img.height; y++) {
                
            }
        }
        reader.onloadend = () => {
            img.src = reader.result
        }
        reader.readAsDataURL(file)
    }
    render() {
        return (
            <div className={`container-fluid container ${styles.imageColorSort}`}>
                <input type="file" onChange={this.onFileChange}/>
                <canvas
                    className={styles.canvas}
                    ref={c => this.canvas = c}
                    width={this.state.width}
                    height={this.state.height}
                    style={{
                        transform: this.state.width && `scale(${800 / this.state.width})`
                    }}
                />
            </div>
        )
    }
}