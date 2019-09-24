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
    console.log(this.props.bills)
    return(
      <div>
        {this.props.bills.map((bill, i) =>(
          <Bill bill={bill}/>
        ))}
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