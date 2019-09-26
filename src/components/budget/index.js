import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills } from '../../ducks/reducers/bills';
import Bill from '../bill/index'

class Budget extends Component {
  constructor() {
    super()
    this.state = {
      bills: {}
    }
  }

  componentDidMount() {
    this.props.getBills()
  }

  render() {
    return(
      <div>
        <a href='/#/budget/bill/new' ><p>Add Bill</p></a>
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
              <Bill key={i + bill.name} bill={bill}/>
            ))}
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