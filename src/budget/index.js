import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBills } from '../ducks/reducers/bills';
import { thisExpression } from '@babel/types';

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getBills()
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills
  }
}

export default connect(mapStateToProps, { getBills })(Budget)