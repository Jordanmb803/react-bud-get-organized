import React, { Component } from 'react'
import './budget.css'
import { connect } from 'react-redux'
import { getTransactions } from '../../ducks/reducers/transactions'
import Transaction from '../transaction/show'
import { updateBudget } from '../../ducks/reducers/budgets'

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      category: '',
      category_amount: 0,
      current_category_balance: 0,
      user_id: 0,
      editable: false
    }
    this.editBudget = this.editBudget.bind(this)
  }
  
  componentDidMount(){
    this.props.getTransactions(this.props.budget.id)
    this.setState({
      id: this.props.budget.id,
      category: this.props.budget.category,
      category_amount: this.props.budget.category_amount,
      current_category_balance: this.props.budget.current_category_balance,
      user_id: this.props.budget.user_id
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.editable !== prevState.editable){
      this.props.getTransactions(this.props.budget.id)
    }
  }

  editBudget() {
    this.props.updateBudget(this.state)
    this.setState({
      editable: false
    })
  }

  render(){
    const headers = ['category', 'category_amount', 'current_category_balance']
    return(
      <div id="budgetComponent">
        <button hidden={this.state.editable} onClick={() => this.setState({editable: true})}>EDIT</button>
        <button hidden={!this.state.editable} onClick={() => this.editBudget()}>DONE</button>
        <div className='header'>
          {headers.map((col, i) => {
            return (
              <div key={col + i}>
                <input
                  value={this.state[col]}
                  type="text"
                  readOnly={!this.state.editable} 
                  onChange={e => this.setState({[col]: e.target.value})}
                />
              </div>
            )
          })}
        </div>
        <div className='transaction'>
          {this.props.transactions.map((transaction, i) => (
            <Transaction
              key={transaction + i}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions
  }
}

export default connect(mapStateToProps, { getTransactions, updateBudget })(Budget)