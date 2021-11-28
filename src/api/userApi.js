import {$host, $authHost} from './axios'

export const registration = async payload => {

  const response = await $host.post('api/users/registration', payload)
  
  return response
}

export const login = async (payload) => {
  const response = await $host.post('api/users/login', payload)
  return response
}

export const update = async (payload) => {
  const response = await $authHost.post('api/users/update', payload)
  return response
}

export const findUsers = async nick => {
  const response = await $authHost.get(`api/users/${nick}`)
  return response
}