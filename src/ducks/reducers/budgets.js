import axios from 'axios'

const initialState = {
  budgets: []
}

const GET_BUDGETS   = 'GET_BUDGETS'
const CREATE_BUDGET = 'CREATE_BUDGET'
const UPDATE_BUDGET = 'UPDATE_BUDGET'
const DELETE_BUDGET = 'DELETE_BUDGET'
const _FULFILLED    = '_FULFILLED'

export function getBudgets() {
  let data = axios.get(`/budget/index`).then(res => {
    return res.data
  })

  return {
    type: GET_BUDGETS,
    payload: data
  }
}

export function createBudget(state) {
  let data = axios.post(`/budget/create`, state).then(res => {
    return res.data
  })

  return {
    type: CREATE_BUDGET,
    payload: data
  }
}

export function updateBudget(state) {
  let data = axios.put(`/budget/update`, state).then(res => {
    return res.data
  })

  return {
    type: UPDATE_BUDGET,
    payload: data
  }
}

export function deleteBudget(id) {
  let data = axios.delete(`/budget/${id}/delete`).then(res => {
    return res.data
  })

  return {
    type: DELETE_BUDGET,
    payload: data
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_BUDGETS + _FULFILLED:
      return Object.assign({}, state, { budgets: action.payload })
    case CREATE_BUDGET + _FULFILLED:
      return Object.assign({}, state, { budgets: action.payload })
    case UPDATE_BUDGET + _FULFILLED:
      return Object.assign({}, state, { budgets: action.payload })
    case DELETE_BUDGET + _FULFILLED:
      return Object.assign({}, state, { budgets: action.payload })
    default:
      return state
  }
}