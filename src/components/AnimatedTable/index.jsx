
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import AnimatedTable from '../../util/animatedTable'

const {string, oneOfType, element, arrayOf} = PropTypes
export default class AnimatedTableReact extends Component {
    static propTypes = {
        className: string,
        children: oneOfType([element, arrayOf(element)])
    }
    static getTableRowsFromChildren(children) {
        return children.find(el => el.type === 'tbody').props.children
    }
    componentDidMount() {
        this.animatedTable = new AnimatedTable(ReactDOM.findDOMNode(this).querySelector('table'))
    }
    componentWillReceiveProps(nextProps) {
        const oldRows = AnimatedTableReact.getTableRowsFromChildren(this.props.children)
        const newRows = AnimatedTableReact.getTableRowsFromChildren(nextProps.children)
        const oldPositionsByKey = _.zipObject(oldRows.map(row => row.props['data-key']), _.keys(Array(oldRows.length)))
        newRows.forEach((row, i) => {
            const oldI = oldPositionsByKey[row.key]
            const newI = i
            if (oldI === undefined) {
                // TODO: come up with some implementation
            } else if (oldI !== newI) {
                this.animatedTable.moveRow(oldI, newI)
            }
        })
    }
    render() {
        return (
            <div>
                <table className={this.props.className}>
                    {this.props.children}
                </table>
            </div>
        )
    }
}