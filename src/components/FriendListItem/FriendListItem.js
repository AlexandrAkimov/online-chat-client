import React, { useState } from 'react';
import EmptyAvatar from '../EmptyAvatar/EmptyAvatar';
import './friendlistitem.css'
import {AiOutlineDelete} from 'react-icons/ai'

const FriendListItem = ({ onlineFriends, friend, connectToFriend, removeFriendHandler }) => {
  const [errorImg, setErrorImg] = useState(false)
  return (
    <li key={friend.id}
      className="item item-friend"
      onClick={(e) => connectToFriend(e, friend.nickname)}>
      <div className="item-user">
        {
          errorImg ? <EmptyAvatar nickname={friend.nickname} /> :
            <img onError={() => setErrorImg(true)} className="avatar" src={`${process.env.REACT_APP_API_URL}${friend.photo}`} alt={friend.photo} />
        }<span className="fr_nick">{friend.nickname}</span>
      </div>
      <div className="friend-actions">
        <span className={`status ${!onlineFriends.some(onf => onf === friend.nickname) ? 'red' : ''}`}>{onlineFriends.some(onf => onf === friend.nickname) ? 'online' : 'offline'}</span>
        <button className="btn_remove" onClick={e => removeFriendHandler(e, friend.id)}>
          <AiOutlineDelete color="tomato" fontSize="20px" />
        </button>
      </div>
    </li>
  );
}

export default FriendListItem;
