import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getBills } from '../../ducks/reducers/bills'

class Bill extends Component {
  constructor(props){
    super(props)
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
    this.handleInput = this.handleInput.bind(this)
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
    let { id, name, bill_amount, due_date, paid_amount, paid } = this.state

    axios.put(`/bill/update`, {id, name, bill_amount, due_date, paid_amount, paid })
      .then(res => {
        this.setState({
          editable: false
        })
      this.props.action()
    })
  }

  handleClick() {
    this.setState({
      paid: !this.state.paid
    })
    if(this.state.paid === false) {
      this.setState({
        paid_amount: this.state.bill_amount
      })
    } else {
      this.setState({
        paid_amount: 0
      })
    }
  }

  handleInput(e, col) {
    let paid = this.state.paid
    e == this.state.bill_amount ? paid = true : paid = false

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
      <tr key={this.props.bill.name + this.props.bill.id}>
        {this.state.columns.map((k, i) => {
          let col = k[0]
          return(
            <td key={col + i}>
              <input
                readOnly={!this.state.editable}
                type={k[1]}
                value={this.state[col]}
                onChange={ e => this.handleInput(e.target.value, col)}
                />
            </td>
          )
        })}
        <td>
          <input
            disabled={!this.state.editable}
            type="checkbox"
            value={this.state.paid}
            checked={this.state.paid}
            onClick={ e => this.handleClick(e)}
          />
        </td>
        <td>
          <button hidden={this.state.editable} onClick={e => this.setState({editable: true })}>
            Edit
          </button>
          <button hidden={!this.state.editable} onClick={() => this.updateBill()}>
            DONE
          </button>
          <button onClick={() => this.props.deleteBill(this.props.bill.id) }>
            REMOVE
          </button>
        </td> 
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills
  }
}

export default connect(mapStateToProps, { getBills })(Bill)