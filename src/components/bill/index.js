import React, { Component } from 'react';
import axios from 'axios';

class Bill extends Component {
  constructor(){
    super()
    this.state = {
      id: 0,
      name: '',
      bill_amount: 0,
      due_date: '',
      paid_amount: 0,
      paid: false,
      editable: false,
      columns: [['name', 'text'], ['bill_amount', 'text'], ['due_date', 'date'], ['paid_amount', 'text']]
    }
    this.updateBill = this.updateBill.bind(this)
  }

  componentDidMount(){
    this.setState({
      id: this.props.bill.id,
      name: this.props.bill.name,
      bill_amount: this.props.bill.bill_amount,
      due_date: this.props.bill.due_date.split('T')[0],
      paid_amount: this.props.bill.paid_amount,
      paid: this.props.bill.paid,
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
        {this.state.columns.map((k, i) => {
          let col = k[0]
          return(
            <td key={col + i}>
              <input
                readOnly={!this.state.editable}
                type={k[1]}
                value={this.state[col]}
                onChange={ e => this.setState({[col]: e.target.value})}
                />
            </td>
          )
        })}
        <td>
          <input
            readOnly={!this.state.editable}
            type="checkbox"
            value={this.state.paid}
            checked={this.state.paid}
            onClick={ e => this.setState({paid: !this.state.paid})}
          />
        </td>
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