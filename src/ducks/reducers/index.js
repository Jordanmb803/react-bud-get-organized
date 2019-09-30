import { combineReducers } from 'redux'
import user from './user'
import bills from './bills'
import income from './income'

export default combineReducers({
  user,
  bills,
  income
})