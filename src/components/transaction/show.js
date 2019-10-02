import React, { Component } from 'react'
import './transaction.css'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
    render() {
      const columns = ['description', 'transaction_amount']
      return(
        <div id="transactionComponent">
          {columns.map((col, i) => {
            return(
              <div key={col + i }>
                {this.props.transaction[col]}
              </div>
            )
          })}
        </div>
    )
  }
}

export default Transaction