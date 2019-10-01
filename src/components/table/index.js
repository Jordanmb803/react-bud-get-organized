import React, { Component } from 'react'
import Row from '../row/index'
import NewRow from '../row/new'
import '../income/income.css'

export default class Table extends Component {
    constructor(props){
      super(props)
      this.state = {
        addRow: false
      }
      this.rowCreated = this.rowCreated.bind(this)
    }
    
    rowCreated(state) {
      this.setState({
        addRow: false
      })
      this.props.createRow(state)
    }

    render(){
      return(
        <div id={`${this.props.tableId}Table`}>
          <button id={`add_${this.props.tableId}_button`} className="addRowButton" onClick={() => this.setState({addRow: true})}>
            ADD {this.props.tableId.toUpperCase()}
          </button>
          <table>
            <tbody>
              <tr>
              {this.props.headers.map((header, i) => {
                return(
                  <th key={i + header}>{header}</th>
                )
              })} 
              </tr>
              {this.props.tableRows.map((row, i) =>(
                <Row 
                  key={i + row.name}
                  row={row}
                  updateRow={this.props.updateRow}
                  deleteRow={this.props.deleteRow}
                  table={this.props.tableId}
                  columns={this.props.columns}
                />
              ))}
              { this.state.addRow ?
                <NewRow
                  action={this.rowCreated}
                  headers={this.props.headers}
                  columns={this.props.columns}
                  table={this.props.tableId}
                  createRow={this.props.createRow}
                />
                : null}
              <tr>
                <td>
                  <strong>Totals: </strong>
                </td>
                {Object.keys(this.props.totals).map((tot, i) => {
                  {if(i == 2){
                    return(
                      <td className='totalDiv' key={tot + i }>
                        <div><strong>Remaining: </strong></div> 
                        <div>{this.props.totals[tot]}</div>
                      </td>
                    )
                  } else {
                    return(
                      <td key={tot + i}>
                        {this.props.totals[tot]}
                      </td>
                    )
                  }}
                })}
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
  }
}