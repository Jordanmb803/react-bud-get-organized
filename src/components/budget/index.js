import React, { Component } from 'react'
import './budget.css'

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div id="budgetComponent">
        {Object.keys(this.props.budget).map((col, i) => {
          return (
            <div key={col + i}>
              <p>{`${col}:`}</p>
              <p>{this.props.budget[col]}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Budget