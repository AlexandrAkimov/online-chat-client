import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import './header.css'
import EmptyAvatar from '../EmptyAvatar/EmptyAvatar';
const Header = ({ onToggle, onLogout, isDrawer }) => {
  const [errorImg, setErrorImg] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  const toProfile = () => {
    setIsMenu(false)
    navigate('/profile')
  }
  return (
    <header className="header">
      <MdMenu color="#fff" fontSize="30px" cursor="pointer" onClick={onToggle} />
      {!isDrawer ?
        <div className="actions">
        <div className="item-user" onClick={() => setIsMenu(prev => !prev)}>
          {
            errorImg ? <EmptyAvatar nickname={currentUser?.nickname} /> :
              <img onError={() => setErrorImg(true)} className="avatar" src={`https://chat-app-online.herokuapp.com/${currentUser?.photo}`} alt={currentUser?.photos} />
          }
          <span className="nickname">{currentUser?.nickname}</span>
        </div>
        
        { isMenu ?
          <div className="menu">
            <p className="menu_item" onClick={toProfile}>Профиль</p>
            <p className="menu_item">Удалить аккаунт</p>
          </div>
          : null
        }
        <div>
          <BiLogOut color="#fff" fontSize="30px" cursor="pointer" onClick={() => onLogout(currentUser?.nickname)} />
        </div>
      </div>
      : null}
      

    </header>
  );
}

export default Header;
