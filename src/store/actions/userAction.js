import jwt_decode from "jwt-decode";
import { LOGIN, LOGOUT, GET_USERS, CLEAR_USERS, GET_CURRENT_USER } from "../types"
import { findUsers, login, registration, update } from '../../api/userApi';

export const getCurrentUser = () => {
  const token = localStorage.token
  const user = jwt_decode(token);
  return {type: GET_CURRENT_USER, payload: user}
}

export const loginAction = (formdata, isLogin) => {
  return async dispatch => {
    try {
      const data = isLogin
        ? await login(formdata)
        : await registration(formdata)
      dispatch({
        type: LOGIN, payload: data.data.token
      })
      localStorage.token = data.data.token;
    } catch (error) {
      throw new Error(error)
    }

  }
}

export const updateProfile = formData => {
  return async dispatch => {
    try {
      const data = await update(formData)
      dispatch({
        type: LOGIN, payload: data.data.token
      })
      localStorage.token = data.data.token;
      dispatch(getCurrentUser())
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const clearUsers = () => ({ type: CLEAR_USERS })

export const logout = () => {
  localStorage.clear()
  return {
    type: LOGOUT,
  }
}



export const getUsers = nickname => {
  return async dispatch => {
    try {
      const users = await findUsers(nickname)
      console.log(users.data);
      dispatch({
        type: GET_USERS, payload: users.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}



