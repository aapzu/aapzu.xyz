
import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

import AnimatedTable from '../AnimatedTable'

export default class TableDemo extends Component {
    constructor() {
        super()
        this.state = {
            list: [...Array(5).keys()].map(i => ({
                A: `rowNumber${i}`,
                B: `anotherColumnIn${i}`,
                C: i
            }))
        }
        this.switchRandom = this.switchRandom.bind(this)
        this.moveRandom = this.moveRandom.bind(this)
        this.deleteRandom = this.deleteRandom.bind(this)
    }
    switchRandom() {
        const len = this.state.list.length
        let numbers = [...Array(len).keys()]
        const rand1 = numbers[Math.floor(Math.random() * len)]
        numbers = _.without(numbers, rand1)
        const rand2 = numbers[Math.floor(Math.random() * (len - 1))]
        let items = this.state.list.slice()
        const item1 = items[rand1]
        items[rand1] = items[rand2]
        items[rand2] = item1
        this.setState({
            list: items
        })
    }
    moveRandom() {
        const len = this.state.list.length
        let numbers = [...Array(len).keys()]
        const rand1 = numbers[Math.floor(Math.random() * len)]
        numbers = _.without(numbers, rand1)
        const rand2 = numbers[Math.floor(Math.random() * (len - 1))]
        let items = this.state.list.slice()
        const item = items[rand1]
        items.splice(rand1, 1)
        items.splice(rand2, 0, item)
        this.setState({
            list: items
        })
    }
    deleteRandom() {
        const len = this.state.list.length
        let numbers = [...Array(len).keys()]
        const rand = numbers[Math.floor(Math.random() * len)]
        let items = this.state.list.slice()
        items.splice(rand, 1)
        this.setState({
            list: items
        })
    }
    render() {
        return (
            <div>
                <AnimatedTable className="table table-bordered">
                    <thead>
                        <tr>
                            {Object.keys(this.state.list[0]).map(key => (
                                <td key={key}>
                                    {key}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map(row => (
                            <tr key={row.C} data-key={`${row.C}`}>
                                {Object.values(row).map(val => (
                                    <td key={`${val}${row.C}`}>
                                        {val}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </AnimatedTable>
                <button onClick={this.switchRandom}>Switch random</button>
                <button onClick={this.moveRandom}>Move random</button>
                <button onClick={this.deleteRandom}>Delete random</button>
            </div>
        )
    }
}