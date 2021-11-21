import {combineReducers} from 'redux'
import { friendReducer } from './friendReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  friend: friendReducer
})