import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills, getMonthlyBillTotal } from '../../ducks/reducers/bills';
import Bill from '../bill/index'
import NewBill from '../bill/new'
import Axios from 'axios';

class Budget extends Component {
  constructor() {
    super()
    this.state = {
        newBill: false,
        deletedBill: false
    }
    this.billCreatedOrEdited = this.billCreatedOrEdited.bind(this)
    this.deleteBill = this.deleteBill.bind(this)
  }

  componentDidMount() {
    this.props.getBills()
    this.props.getMonthlyBillTotal()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      console.log(`state changed`)
      this.props.getBills()
      this.props.getMonthlyBillTotal()
    }
  }

  billCreatedOrEdited() {
    this.setState({
      newBill: false,
    })
  }

  deleteBill(bill_id) {
    Axios.delete(`/bill/${bill_id}/delete`).then(res =>{
      console.log(`bill deleted`)
      this.setState({
         deletedBill: true
       })
    })
  }


  render() {
    return(
      <div>
        <button onClick={() => this.setState({newBill: true })}>Add Bill</button>
        <table>
          <tbody>
            <tr>
              <th>Rent</th>
              <th>Amount Due</th>
              <th>Due Date</th>
              <th>Amount Paid</th>
              <th>Paid?</th>
            </tr>
            {this.props.bills.map((bill, i) =>(
              <Bill key={i + bill.name} bill={bill} action={this.billCreatedOrEdited} deleteBill={this.deleteBill}/>
            ))}
            {this.state.newBill ? <NewBill action={this.billCreatedOrEdited} /> : null}
            <tr>
              <td>
              </td>
              <td>
                {this.props.totals.bill_amount_total}
              </td>
              <td>
              </td>
              <td>
                {this.props.totals.paid_amount_total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills.bills,
    totals: state.bills.totals
  }
}

export default connect(mapStateToProps, { getBills, getMonthlyBillTotal })(Budget)