import Axios from "axios"

const initialState = {
  transactions: []
}

const GET_TRANSACTIONS   = 'GET_TRANSACTIONS'
const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
const _FULFILLED         = '_FULFILLED'

export function getTransactions(budget_id) {
  let data = Axios.get(`/transactions/index/${budget_id}`).then(res => {
    return res.data
  })

  return {
    type: GET_TRANSACTIONS,
    payload: data
  }
}

export function createTransaction(state) {
  let data = Axios.post(`/transaction/create`, state).then(res => {
    return res.data
  })

  return {
    type: CREATE_TRANSACTION,
    payload: data
  }
}

export function updateTransaction(state) {
  let data = Axios.put(`/transaction/update`, state).then(res => {
    return res.data
  })

  return {
    type: UPDATE_TRANSACTION,
    payload: data
  }
}

export function deleteTransaction(id, budget_id) {
  let data = Axios.delete(`/transaction/${id}/delete`).then(res => {
    return Axios.get(`/transactions/index/${budget_id}`).then(res => {
      return res.data
    })
  })

  return {
    type: DELETE_TRANSACTION,
    payload: data
  }
}

export default function reducers(state = initialState, action) {
  switch(action.type) {
    case GET_TRANSACTIONS + _FULFILLED:
      return Object.assign({}, state, { transactions: action.payload })
    case CREATE_TRANSACTION + _FULFILLED:
      return Object.assign({}, state, { transactions: action.payload })
    case UPDATE_TRANSACTION + _FULFILLED:
      return Object.assign({}, state, { transactions: action.payload })
    case DELETE_TRANSACTION + _FULFILLED:
      return Object.assign({}, state, { transactions: action.payload })
    default:
      return initialState
  }
}