import { combineReducers } from 'redux'
import user from './user'
import bills from './bills'
import income from './income'
import budgets from './budgets'

export default combineReducers({
  user,
  bills,
  income,
  budgets
})