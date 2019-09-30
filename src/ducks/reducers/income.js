import axios from 'axios'

const initialState = {
  income: [],
  date: new Date(),
  totals: {}
}

const GET_INCOME                = 'GET_INCOME'
const GET_MONTHLY_INCOME_TOTALS = 'GET_MONTHLY_INCOME_TOTALS'
const _FULFILLED                = '_FULFILLED'

export function getIncome() {
  let data = axios.get(`/income/month/${initialState.date.getMonth() + 1}`)
    .then(res => {
      return res.data
    })

    return {
      type: GET_INCOME,
      payload: data
    }
}

export function getMonthlyIncomeTotals() {
  let data = axios.get(`/income/totals/month/${initialState.date.getMonth() + 1}`).then(res => {
    return res.data[0]
  })

  return {
    type: GET_MONTHLY_INCOME_TOTALS,
    payload: data
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_INCOME + _FULFILLED:
      return Object.assign({}, state, { income: action.payload })
    case GET_MONTHLY_INCOME_TOTALS + _FULFILLED:
      return Object.assign({}, state, { totals: action.payload })
    default:
      return state
  }
}