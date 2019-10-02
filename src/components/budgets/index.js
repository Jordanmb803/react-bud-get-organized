import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBudgets } from '../../ducks/reducers/budgets'
import Budget from '../budget/index'

class Budgets extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getBudgets()
  }

  render(){
    return(
      <div>
       {this.props.budgets.map((budget, i) => (
         <Budget
          key={budget + i}
          budget={budget}
         />
       ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    budgets: state.budgets.budgets
  }
}

export default connect(mapStateToProps, { getBudgets })(Budgets)