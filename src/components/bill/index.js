import React, { Component } from 'react';
import axios from 'axios';
import { thisExpression } from '@babel/types';

class Bill extends Component {
  constructor(){
    super()
    this.state = {
      id: 0,
      name: '',
      bill_amount: 0,
      due_date: '',
      paid_amount: 0,
      paid: 'false',
      editable: false,
      columns: ['name', 'bill_amount', 'due_date', 'paid_amount', 'paid']
    }
    this.updateBill = this.updateBill.bind(this)
  }

  componentDidMount(){
    this.setState({
      id: this.props.bill.id,
      name: this.props.bill.name,
      bill_amount: this.props.bill.bill_amount,
      due_date: this.props.bill.due_date,
      paid_amount: this.props.bill.paid_amount,
      paid: this.props.bill.paid
    })
  }

  updateBill() {
    const { id, name, bill_amount, due_date, paid_amount, paid } = this.state
    axios.put(`/bill/update`, {id, name, bill_amount, due_date, paid_amount, paid })
      .then(res => {
        this.setState({
          editable: false
        })
    })
  }

  render(){
    return(
      <tr key={this.props.bill.name + this.props.bill.id}>
        {this.state.columns.map((k, i) => (
          <td key={k + i}>
            <input
              readOnly={!this.state.editable}
              type="text"
              value={this.state[k]}
              onChange={ e => this.setState({[k]: e.target.value})}
              />
          </td>
        ))}
          <td>
            <button hidden={this.state.editable} onClick={e => this.setState({editable: true })}>
              Edit
             </button>
            <button hidden={!this.state.editable} onClick={() => this.updateBill()}>
              DONE
            </button>
          </td> 
      </tr>
    )
  }
}

export default Bill