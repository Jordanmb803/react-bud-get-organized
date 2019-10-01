import axios from "axios"

const initialState = {
  bills: [],
  date: new Date(),
  totals: {}
}

const GET_BILLS               = 'GET_BILLS'
const CREATE_BILL             = 'CREATE_BILL'
const UPDATE_BILL             = 'UPDATE_BILL'
const DELETE_BILL             = 'DELETE_BILL'
const GET_MONTHLY_BILL_TOTALS = 'GET_MONTHLY_BILL_TOTALS'
const _FULFILLED              = '_FULFILLED'

export function getBills() {
  let data = axios.get(`/bills/month/${initialState.date.getMonth() + 1}`).then(res => {
    return res.data
  })

  return {
    type: GET_BILLS,
    payload: data
  }
}

export function createBill(state) {
  let data = axios.post(`/bill/create`, state).then(res => {
    return axios.get(`/bills/month/${initialState.date.getMonth() + 1}`).then(res => {
      return res.data
    })
  })

  return {
    type: CREATE_BILL,
    payload: data
  }
}

export function updateBill(state) {
  let data = axios.put(`/bill/update`, state).then(res => {
    return axios.get(`/bills/month/${initialState.date.getMonth() + 1}`).then(res => {
      return res.data
    })
  })

  return {
    type: UPDATE_BILL,
    payload: data
  }
}

export function getMonthlyBillTotal() {
  let data = axios.get(`/bills/totals/month/${initialState.date.getMonth() + 1}`).then(res => {
    return res.data[0]
  })

  return {
    type: GET_MONTHLY_BILL_TOTALS,
    payload: data
  }
}

export function deleteBill(id) {
  let data = axios.delete(`/bill/${id}/delete`).then(res => {
    return axios.get(`/bills/month/${initialState.date.getMonth() + 1}`).then(res => {
      return res.data
    })
  })

  return {
    type: DELETE_BILL,
    payload: data
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_BILLS + _FULFILLED:
      return Object.assign({}, state, { bills: action.payload })
    case CREATE_BILL + _FULFILLED:
      return Object.assign({}, state, { bills: action.payload })
    case UPDATE_BILL + _FULFILLED:
      return Object.assign({}, state, { bills: action.payload })
    case GET_MONTHLY_BILL_TOTALS + _FULFILLED:
      return Object.assign({}, state, { totals: action.payload })
    case DELETE_BILL + _FULFILLED:
      return Object.assign({}, state, { bills: action.payload })
    default:
      return state
  }
}
