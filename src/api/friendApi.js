import {$authHost} from './axios'

export const addFriend = async ({id, nickname}) => {
  const response = await $authHost.post('api/friend', {id, nickname})
  return response
}

export const removeFriend = async id => {
  const response = await $authHost.delete('api/friend', { data: {id}} )
  return response
}

export const getFriendsApi = async () => {
  const response = await $authHost.get(`api/friend`)
  return response
}