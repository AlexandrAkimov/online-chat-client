import './findlist.css'
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { friendAddAction } from '../../store/actions/friendAction';
import FindListItem from '../FindListItem/FindListItem';


const Findlist = ({users}) => {
  const currentUser = useSelector(state => state.user.currentUser)
  const friends = useSelector(state => state.friend.friends)
  const dispatch = useDispatch()
  const addFriend = friend => {
    dispatch(friendAddAction(friend))
  }
  useEffect(() => {
    console.log(friends);
  }, [friends]);
  return (
    <div>
      <p style={{color: '#7a7a7a'}}><strong>Найдено {users.length} человек:</strong></p>
      <ul className="list">
        {users.filter(u => u.id !== currentUser.id).map(user => (
          <FindListItem key={user.id} onAddFriend={addFriend} user={user} friends={friends}/>
        ))}
      </ul>
    </div>
  );
}

export default Findlist;
