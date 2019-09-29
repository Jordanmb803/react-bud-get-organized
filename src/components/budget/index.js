import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills, getMonthlyBillTotal } from '../../ducks/reducers/bills';
import './budget.css'
import Table from '../table/index'
import Axios from 'axios'

class Budget extends Component {
  constructor() {
    super()
    this.state = {
        newRow:    false,
        deleteRow: false,
    }
    this.createdOrEditedRow = this.createdOrEditedRow.bind(this)
    this.deleteRow          = this.deleteRow.bind(this)
    this.addNewRow          = this.addNewRow.bind(this)
  }

  componentDidMount() {
    this.props.getBills()
    this.props.getMonthlyBillTotal()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      this.props.getBills()
      this.props.getMonthlyBillTotal()
    }
  }

  createdOrEditedRow() {
    this.setState({
      newRow: false,
    })
  }

  deleteRow(bill_id) {
    Axios.delete(`/bill/${bill_id}/delete`).then(res =>{
      this.setState({
         deleteRow: true
       })
    })
  }

  addNewRow() {
    this.setState({
      newRow: true
    })
  }

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const billsTableHeaders = ['Name', 'Amount Due', 'Amount Paid', 'Due Date', 'Paid?', 'Edit', 'Remove']
    const billsTableColumns = [['name', 'text'], ['bill_amount', 'text'], ['paid_amount', 'text'], ['due_date', 'date'], ['paid', 'checkbox']]

    return(
      <div id="BudgetComponent">
        <h3>{monthNames[new Date().getMonth()]}</h3>

        <Table 
          tableId="bill"
          headers={billsTableHeaders}
          tableRow={this.props.bills}
          totals={this.props.totals}
          createdOrEditedRow={this.createdOrEditedRow}
          deleteRow={this.deleteRow}
          newRow={this.state.newRow}
          addNewRow={this.addNewRow}
          columns={billsTableColumns}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills.bills,
    totals: state.bills.totals,
  }
}

export default connect(mapStateToProps, { getBills, getMonthlyBillTotal })(Budget)