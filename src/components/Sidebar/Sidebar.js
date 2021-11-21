import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getFriends } from '../../store/actions/friendAction';
import { getUsers } from '../../store/actions/userAction';
import Findlist from '../FindList/FindList';
import Friends from '../Friends/Friends';
import './sidebar.css'

const Sidebar = ({isDrawer, onConnect, onlineUsers}) => {
  const dispatch = useDispatch()
  const [sidebar, setSidebar] = useState(['sidebar'])
  const users = useSelector(state => state.user.users)

  const [nick, setNick] = useState('')

  const fetchFriends = useCallback(() => {
    dispatch(getFriends())
  }, [dispatch])

  useEffect(() => {
    fetchFriends()
  }, [fetchFriends]);

  useEffect(() => {
    isDrawer ? setSidebar(['sidebar', 'is_open']) : setSidebar(['sidebar'])
  }, [isDrawer])
  
  return (
    <div className={sidebar.join(' ')}>
      <div className="sidebar_content">
        <input 
          type="text" 
          className="input"
          placeholder="Найти контакт" 
          value={nick} 
          onChange={e => setNick(e.target.value)}/>
        <button className="btn" onClick={() => dispatch(getUsers(nick))}>Найти</button>
        {users.length ?
          <>
            <Findlist users={users}/>
            <hr color="#7a7a7a"/>
          </>
          : null}
        <Friends onConnect={onConnect} onlineFriends={[...new Set(onlineUsers)]}/>
      </div>

    </div>
  );
}

export default Sidebar;
