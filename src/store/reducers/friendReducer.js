import { ADD_FRIEND, GET_FRIENDS, REMOVE_FRIEND } from "../types";

const initialState = {
  friends: []
};

const handlers = {
  [ADD_FRIEND]: (state, action) => ({
    ...state,
    friends: [...state.friends, action.payload],
  }),
  [REMOVE_FRIEND]: (state, action) => ({
    ...state,
    friends: state.friends.filter(f => f.id !== action.payload),
  }),
  [GET_FRIENDS]: (state, action) => ({
    ...state,
    friends: action.payload,
  }),
  DEFAULT: state => state
}

export const friendReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}