import axios from "axios"

const initialState = {
  bills: {},
  date: new Date()
}

const GET_BILLS = 'GET_BILLS'

const _FULFILLED = '_FULFILLED'

export function getBills(userID) {
  let data = axios.get(`/bills/month/${initialState.date.getMonth() + 1}`).then(res => {
    return res.data
  })

  return {
    type: GET_BILLS,
    payload: data
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_BILLS + _FULFILLED:
      return Object.assign({}, state, { bills: action.payload })
    default:
      return state
  }
}
