import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills } from '../../ducks/reducers/bills';
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
    this.billCreated = this.billCreated.bind(this)
  }

  componentDidMount() {
    this.props.getBills()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      this.props.getBills()
    }
    if(prevProps !== this.props){
      this.props.getBills()
    }
  }

  billCreated(bill) {
    this.setState({
      newBill: false,
    })
  }

  deleteBill(bill_id) {
    Axios.delete(`/bill/${bill_id}/delete`).then(res =>{
      console.log(`bill deleted`)
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
              <Bill key={i + bill.name} bill={bill} deleteBill={this.deleteBill}/>
            ))}
            { this.state.newBill ? <NewBill action={this.billCreated} /> : null }
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills.bills
  }
}

export default connect(mapStateToProps, { getBills })(Budget)