
import Velocity from 'velocity-animate'

export default class AnimatedTable {
    constructor(tableElement, options) {
        if (tableElement.tagName.toLowerCase() !== 'table') {
            throw new Error('Table element must be a table!')
        }
        this.table = tableElement
        this.tbody = this.table.querySelector('tbody')
        
        this.options = Object.assign({}, options, {
            duration: 1000,
            easing: 'ease'
        })
        
        this.clonedRowsByKey = {}
    }
    _cloneAndAppendRow(row) {
        const bgColor = '#FFFFFF'
        
        const clonedTable = this.table.cloneNode(false)
        const clonedRow = row.cloneNode(true)
        
        row.style.color = bgColor
        
        // Make it absolutely positioned and non-see-through
        clonedTable.style.position = 'absolute'
        clonedTable.style.background = bgColor
        
        const tbody = document.createElement('tbody')
        clonedTable.appendChild(tbody)
        tbody.appendChild(clonedRow)
        
        this.table.parentElement.appendChild(clonedTable)
        
        const offset = row.getBoundingClientRect()
        clonedTable.style.top = `${offset.top}px`
        clonedTable.style.left = `${offset.left}px`
    
        const origTds = row.querySelectorAll('td')
        const newTds = clonedRow.querySelectorAll('td')
        for (let i = 0; i < newTds.length; i++) {
            newTds[i].style.width = `${origTds[i].offsetWidth}px`
        }
        
        return clonedTable
    }
    moveRow(from, to) {
        const rowList = this.tbody.querySelectorAll('tr')
        const row = rowList[from]
        const key = row.dataset.key
        
        // TODO: support also tables with other colors
        const textColor = '#000000'
        let clonedRow = this.clonedRowsByKey[key]
        if (!clonedRow) {
            clonedRow = this._cloneAndAppendRow(row)
            this.clonedRowsByKey[row.dataset.key] = clonedRow
        } else {
            Velocity(clonedRow, 'stop')
        }
        
        const toY = rowList[to].getBoundingClientRect().top
        Velocity.animate(clonedRow, {
            top: toY
        }, {
            duration: this.options.duration,
            easing: this.options.easing,
            complete: () => {
                delete this.clonedRowsByKey[key]
                clonedRow.parentNode.removeChild(clonedRow)
                row.style.color = textColor
            }
        })
    }
}