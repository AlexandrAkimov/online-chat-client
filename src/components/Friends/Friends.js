import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import './friends.css'
import { friendRemoveAction } from '../../store/actions/friendAction';
import FriendListItem from '../FriendListItem/FriendListItem';

const Friends = ({onConnect, onlineFriends}) => {

  const dispatch = useDispatch()
  const friends = useSelector(state => state.friend.friends)

  const removeFriendHandler = (event, id) => {
    event.stopPropagation()
    dispatch(friendRemoveAction(id))
  }

  const connectToFriend = (e, nickname) => {
    e.stopPropagation()
    onConnect(nickname)
  }
  return (
    <div>
      <p style={{color: '#7a7a7a'}}><strong>Мои Друзья:</strong></p>
      <ul className="list">
        {friends.map(f => (
          <FriendListItem key={f.id} friend={f} connectToFriend={connectToFriend} removeFriendHandler={removeFriendHandler} onlineFriends={onlineFriends}/>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
