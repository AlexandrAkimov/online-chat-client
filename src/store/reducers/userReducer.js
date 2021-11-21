import { GET_USERS, LOGIN, LOGOUT, CLEAR_USERS, GET_CURRENT_USER } from "../types";

const initialState = {
  token: null,
  users: [],
  currentUser: null
};

const handlers = {
  [LOGIN]: (state, action) => ({
    ...state,
    token: action.payload,
  }),
  [LOGOUT]: (state) => ({
    ...state,
    token: null,
    currentUser: null
  }),
  [GET_USERS]: (state, action) => ({
    ...state,
    users: action.payload,
  }),
  [CLEAR_USERS]: (state) => ({
    ...state,
    users: []
  }),
  [GET_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: action.payload
  }),
  DEFAULT: state => state
}

export const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}