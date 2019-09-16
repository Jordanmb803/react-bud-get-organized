import React, { Component } from 'react';
import axios from 'axios';

export default class Budget extends Component {
  constructor() {
    super()
    this.state = {
      bills: []
    }
  }

  componentDidMount() {
    axios.get('/bills').then(res => {
      console.log(res)
      this.setState({
        bills: res.data
      })
    })
  }

  render() {
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