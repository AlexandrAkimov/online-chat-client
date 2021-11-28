import React, { useState, useRef } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { logout } from '../../store/actions/userAction';
import './chat.css'
import Header from '../Header/Header';
import { AiOutlineSend } from "react-icons/ai";


const Home = ({ onToggle, messages, sendMessage, onDisconnect, currentUser, isDrawer }) => {
  const divRef = useRef(null);
  let params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logoutHandler = (nickname) => {
    onDisconnect(nickname)
    dispatch(logout())
    navigate('/login')
  }


  //const [connected, setConnected] = useState(false)
  const [value, setValue] = useState('')


  const keyUpHandlerSendMessage = e => {
    if (e.code === 'Enter') {
      sendMessage(value)
      setValue('')
      setTimeout(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }, 0);

    }
  }

  function uniqueBy(a, cond) {
    return a.filter((e, i) => a.findIndex(e2 => cond(e, e2)) === i);
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Header onToggle={onToggle} onLogout={logoutHandler} isDrawer={isDrawer}/>
      {
        !params.profile ?
          <div className="main_home">
            <div className="home" ref={divRef}>

              {uniqueBy(messages, (m, m2) => m.id === m2.id).map(mess => {
                return (<div key={mess.id}>
                  {
                    mess.event === 'connection'
                      ? <div className="meta_text">Пользователь {mess.username} подключился</div>
                      : <div className={`meta_user_text ${mess.username !== currentUser.nickname ? 'right' : ''}`}>
                        <div>{mess.username === currentUser.nickname ? 'Вы' : mess.username}</div>
                        <div className={`message_text ${mess.username === currentUser.nickname ? 'myself' : ''}`}>{mess.message}</div> <span className="time">{moment(new Date(+mess.id)).format('HH:mm')}</span>
                      </div>
                  }
                </div>)
              })}

            </div>
            <div className="actionss">
              <textarea
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                className="textarea"
                placeholder="Введите сообщение"
                onKeyUp={keyUpHandlerSendMessage} />

              <AiOutlineSend color="#7a7a7a" fontSize="30px" onClick={() => {
                sendMessage(value);
                setValue('')
                setTimeout(() => {
                  divRef.current.scrollTop = divRef.current.scrollHeight;
                }, 0);
              }} />

            </div>

          </div> : null
      }

      <Outlet />
    </div>
  );
};



export default Home;
