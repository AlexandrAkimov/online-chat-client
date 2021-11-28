import { GET_FRIENDS, REMOVE_FRIEND} from "../types"
import {addFriend, removeFriend, getFriendsApi} from '../../api/friendApi';

export const getFriends = () => {
  return async dispatch => {
    try {
      const friends = await getFriendsApi()
      console.log(friends);
      dispatch({
        type: GET_FRIENDS, payload: friends.data
      })  
    } catch (error) {
      console.log(error);      
    }
  }
}

export const friendAddAction = friend => {
  return async dispatch => {
    try {
      await addFriend(friend) //{id, nickname}
      dispatch(getFriends())  
    } catch (error) {
      console.log(error);
    }
  }
}

export const friendRemoveAction = id => {
  return async dispatch => {
    try {
      await removeFriend(id)
      dispatch({
        type: REMOVE_FRIEND, payload: id
      })  
    } catch (error) {
      console.log(error);
    }
  }
}



