import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills, getMonthlyBillTotal } from '../../ducks/reducers/bills';
import { getIncome, getMonthlyIncomeTotals } from '../../ducks/reducers/income'
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
    this.props.getIncome()
    this.props.getMonthlyIncomeTotals()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      this.props.getBills()
      this.props.getMonthlyBillTotal()
      this.props.getIncome()
      this.props.getMonthlyIncomeTotals()
    }
  }

  createdOrEditedRow() {
    this.setState({
      newRow: false,
    })
  }

  deleteRow(table, id) {
    console.log(`${table}, ${id}`)
    Axios.delete(`/${table}/${id}/delete`).then(res =>{
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

    const incomeTableHeaders = ['Income', 'Income Amount', 'Date Recieved', ['Edit'], ['Remove']]
    const incomeTableColumns = [['name', 'text'], ['income_amount', 'text'], ['income_date', 'date']]
    return(
      <div id="BudgetComponent">
        <h3>{monthNames[new Date().getMonth()]}</h3>
        <Table
          tableId="income" 
          headers={incomeTableHeaders}
          tableRows={this.props.income}
          totals={this.props.incomeTotals}
          createdOrEditedRow={this.createdOrEditedRow}
          deleteRow={this.deleteRow}
          newRow={this.state.newRow}
          addNewRow={this.addNewRow}
          columns={incomeTableColumns}
        />
        <Table 
          tableId="bill"
          headers={billsTableHeaders}
          tableRows={this.props.bills}
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
    income: state.income.income,
    incomeTotals: state.income.totals
  }
}

export default connect(mapStateToProps, { getBills, getMonthlyBillTotal, getIncome, getMonthlyIncomeTotals })(Budget)