import React, { Component } from 'react'

class NewRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      bill_amount: 0,
      due_date: '',
      paid: false,
      recurring: false,
      paid_amount: 0,
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e, col) {
    if(col == 'paid') {
      if(this.state.paid === false) {
        this.setState({
          paid_amount: this.state.bill_amount,
          paid: !this.state.paid,
        })
      } else {
        this.setState({
          paid_amount: 0,
          paid: !this.state.paid
        })
      } 
    } else {
      let paid = this.state.paid

      if(col == 'paid_amount') {
        e == this.state.bill_amount ? paid = true : paid = false
      }

      if(paid) {
        this.setState({
          paid_amount: this.state.bill_amount,
          paid: paid
        })
      }
      this.setState({
        [col]: e,
        paid: paid
      })
    }
  }

  render(){
    return(
      <tr>
        {this.props.columns.map((col, i) => {
          let key = col[0]
          return(
          <td key={key + i}>
            <input
              className={`${key}_input`}
              type={col[1]}
              placeholder={key}
              value={this.state[key]}
              checked={this.state[key]}
              onChange={e => this.handleInput(e.target.value, key)}
            />
          </td>
        )})}
        <td>
            <button className="red" onClick={() => this.props.action()}>Cancel</button>
        </td>
        <td>
          <button className="green" onClick={() => this.props.action(this.state)}>Create Bill</button>
        </td>
      </tr>
    )
  }
}

export default NewRow