import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../ducks/user';

class Budget extends Component {
  constructor() {
    super()
    this.state = {
      bills: []
    }
  }

  componentDidMount() {
    this.props.getUser()

    axios.get('/bills').then(res => {
      console.log(res.data)
      this.setState({
        bills: res.data
      })
    })
  }

  render() {
    console.log(this.props.user)
    return(
      <div>
        {this.state.bills.map(b => {
          return(
          <p key={b.id}>{b.bill_amount}</p>
          )
        }) }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUser })(Budget)