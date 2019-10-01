import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills, createBill, updateBill, getMonthlyBillTotal, deleteBill } from '../../ducks/reducers/bills';
import { getIncome, createIncome, updateIncome, getMonthlyIncomeTotals, deleteIncome } from '../../ducks/reducers/income'
import './budget.css'
import Table from '../table/index'

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getBills()
    this.props.getMonthlyBillTotal()
    this.props.getIncome()
    this.props.getMonthlyIncomeTotals()
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.props.getMonthlyIncomeTotals()
      this.props.getMonthlyBillTotal()
    }
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
          createRow={this.props.createIncome}
          updateRow={this.props.updateIncome}
          deleteRow={this.props.deleteIncome}
          columns={incomeTableColumns}
        />
        <Table 
          tableId="bill"
          headers={billsTableHeaders}
          tableRows={this.props.bills}
          totals={this.props.totals}
          createRow={this.props.createBill}
          updateRow={this.props.updateBill}
          deleteRow={this.props.deleteBill}
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

export default connect(mapStateToProps, { getBills, createBill, updateBill, getMonthlyBillTotal, deleteBill, getIncome, createIncome, updateIncome, getMonthlyIncomeTotals, deleteIncome })(Budget)