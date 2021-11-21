import React, { useState } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/userAction';
import './chat.css'
import Header from '../Header/Header';


const Home = ({ onToggle, messages, sendMessage, onDisconnect }) => {
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
    }
  }

  function uniqueBy(a, cond) {
    return a.filter((e, i) => a.findIndex(e2 => cond(e, e2)) === i);
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Header onToggle={onToggle} onLogout={logoutHandler} />
      {
        !params.profile ?
          <div className="home">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите сообщение" onKeyUp={keyUpHandlerSendMessage} />
            <button onClick={() => sendMessage(value)}>Отправить сообщение</button>
            {uniqueBy(messages, (m, m2) => m.id === m2.id).map(mess => {
              return (<div key={mess.id}>
                {
                  mess.event === 'connection'
                    ? <div>Пользователь {mess.username} подключился</div>
                    : <div>{mess.username}. {mess.message}</div>
                }
              </div>)
            })}

          </div> : null
      }

      <Outlet />
    </div>
  );
};



export default Home;
