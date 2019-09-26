import React, { Component } from 'react'
import axios from 'axios'

class NewBill extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      bill_amount: 0,
      due_date: '',
      paid: false,
      recurring: false,
      paid_amount: 0,
      columns: [['name', 'text'], ['bill_amount', 'text'], ['due_date', 'date'], ['paid_amount', 'text']],
      checkboxes: ['paid', 'recurring']
    }
    this.createBill = this.createBill.bind(this)
  }

  createBill() {
    const { name, bill_amount, due_date, paid, recurring, paid_amount } = this.state
    axios.post('/bill/create', {name, bill_amount, due_date, paid, recurring, paid_amount})
      .then(res => {
        console.log(`record created`)
      })
  }

  render(){
    return(
      <div>
        {this.state.columns.map((col, i) => {
          let key = col[0]
          return(
          <input
            key={key + i}
            type={col[1]}
            placeholder={key}
            value={this.state[key]}
            onChange={e => this.setState({[key]: e.target.value})}
          />
        )})}
        {this.state.checkboxes.map((col, i) => {
          return(
            <input
              key={col + i}
              type='checkbox'
              value={this.state[col]}
              onClick={e => this.setState({[col]: e.target.value})} 
            />
        )})}
        <a href='/#/budget'>
          <button onClick={() => this.createBill()}>Create Bill</button>
        </a>
      </div>
    )
  }
}

export default NewBill