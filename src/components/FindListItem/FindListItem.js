import React, { useState } from 'react';
import EmptyAvatar from '../EmptyAvatar/EmptyAvatar';
import './findlistitem.css';

const FindListItem = ({user, friends, onAddFriend}) => {
  const [errorImg, setErrorImg] = useState(false)
  return (
    <li key={user.id} className="item">
      <div className="item-user">
        {
          errorImg ? <EmptyAvatar nickname={user.nickname}/> :
          <img onError={() => setErrorImg(true)} className="avatar" src={`${process.env.REACT_APP_API_URL}${user?.photo}`} alt={user.photo} />
        }{user.nickname}
      </div>

      {friends.some(f => f.friendid === user.id)
        ? null
        : <button onClick={() => onAddFriend(user)}>+</button>
      }
    </li>
  );
}

export default FindListItem;
