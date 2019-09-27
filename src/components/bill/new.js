import React, { Component } from 'react'
import axios from 'axios'

class NewBill extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      bill_amount: 0,
      due_date: '',
      paid: false,
      recurring: false,
      paid_amount: 0,
      columns: [['name', 'text'], ['bill_amount', 'text'], ['paid_amount', 'text'], ['due_date', 'date']],
      checkboxes: ['paid']
    }
    this.createBill = this.createBill.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  createBill() {
    console.log(this.state.paid)
    const { name, bill_amount, due_date, paid, recurring, paid_amount } = this.state
    axios.post('/bill/create', {name, bill_amount, due_date, paid, recurring, paid_amount})
      .then(res => {
        console.log(`record created`)
        this.props.action(res.data)
      })
  }

  handleClick() {
    // this.setState({
    //   paid: !this.state.paid
    // })
    if(this.state.paid == false) {
      this.setState({
        paid_amount: this.state.bill_amount,
        paid: !this.state.paid
      })
    } else {
      this.setState({
        paid_amount: 0,
        paid: !this.state.paid
      })
    }
  }

  handleInput(e, col) {
    let paid = this.state.paid

    if(col == 'paid_amount') {
      e == this.state.bill_amount ? paid = true : paid = false
    }

    if(paid) {
      this.setState({
        paid_amount: this.state.bill_amount,
      })
    }
    this.setState({
      [col]: e,
      paid: paid
    })
  }

  render(){
    return(
      <tr>
        {this.state.columns.map((col, i) => {
          let key = col[0]
          return(
          <td key={key + i}>
            <input
              type={col[1]}
              placeholder={key}
              value={this.state[key]}
              onChange={e => this.handleInput(e.target.value, key)}
            />
          </td>
        )})}
        {this.state.checkboxes.map((col, i) => {
          return(
            <td key={col + i}>
              <input
                className="paid_input"
                type='checkbox'
                value={this.state[col]}
                checked={this.state[col]}
                onChange={e => this.handleClick()} 
              />
            </td>
        )})}
        <td>
            <button className="red" onClick={() => this.props.action()}>Cancel</button>
        </td>
        <td>
          <button className="green" onClick={() => this.createBill()}>Create Bill</button>
        </td>
      </tr>
    )
  }
}

export default NewBill