import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getBills } from '../../ducks/reducers/bills'

class Row extends Component {
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
    }
    this.updateRow   = this.updateRow.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount(){
    const keys = Object.keys(this.props.row)
    keys.forEach(k => {
      if(k === 'due_date'){
        this.setState({
          [k]: this.props.row[k].split('T')[0]
        })
      } else {
        this.setState({
          [k]: this.props.row[k]
        })
      }
    })
  }

  updateRow() {
    axios.put(`/${this.props.table}/update`, this.state )
      .then(res => {
        this.setState({
          editable: false
        })
        this.props.action()
      })
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
      <tr key={this.props.row.name + this.props.row.id}>
        {this.props.columns.map((k, i) => {
          let col = k[0]
          return(
            <td key={col + i}>
              <input
                className={`${col}_input`}
                readOnly={!this.state.editable}
                disabled={!this.state.editable}
                type={k[1]}
                value={this.state[col]}
                checked={this.state[col]}
                onChange={ e => this.handleInput(e.target.value, col)}
              />
            </td>
          )
        })}
      <td className={this.state.editable ? 'hidden' : 'td_button'}>
          <button hidden={this.state.editable} onClick={e => this.setState({editable: true })}>
            EDIT
          </button>
        </td>
        <td className={this.state.editable ? 'td_button' : 'hidden'}>
          <button hidden={!this.state.editable} onClick={() => this.updateRow()}>
            DONE
          </button>
        </td>
        <td className="td_button">
          <button className="red" onClick={() => this.props.deleteRow(this.props.row.id) }>
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

export default connect(mapStateToProps, { getBills })(Row)