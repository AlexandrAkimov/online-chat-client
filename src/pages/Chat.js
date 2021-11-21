import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar';
import Home from '../components/Home/Chat'
import { getCurrentUser } from '../store/actions/userAction';

const Chat = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const [isDrawer, setIsDrawer] = useState(false)
  const [room, setRoom] = useState(``)
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [clients, setClients] = useState([])

  const socket = useRef()
  const publicSocket = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.token) {
      return navigate('/login')
    }
    dispatch(getCurrentUser())
    if (currentUser?.nickname && !publicSocket.current) {
      publicSocket.current = new WebSocket('ws://localhost:5000')
      publicSocket.current.onopen = () => {
        const message = {
          event: 'connection',
          user: currentUser?.nickname,
          id: Date.now(),
        }
        
        publicSocket.current.send(JSON.stringify(message))
        console.log('Общее подключение установлено');
      }
      publicSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.event === 'connection') {
          setOnlineUsers(prev => [...prev, data.user])  
        }

        if (data.event === 'disconnect') {
          setOnlineUsers(prev => prev.filter(p => p !== data.user))  
        }
      }
      publicSocket.current.onclose = (event) => {
        console.log('publicSocket closed');
      }
    }


  }, [dispatch, navigate, currentUser?.nickname, setOnlineUsers]);

  const toggleDrawerHandler = () => {
    setIsDrawer(prev => !prev)
  }

  const connection = (roomNum) => {
    socket.current = new WebSocket('ws://localhost:5000')
    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        username: currentUser?.nickname,
        id: Date.now(),
        room: roomNum
      }
      
      if (!clients.includes(message.id)) {
        socket.current.send(JSON.stringify(message))  
      }
      
      setClients([...clients, message.id])
      console.log(`Подключение ${roomNum} установлено`);
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.room) {
        setMessages(prev => [...prev, message])
      }
      
    }

    socket.current.onclose = (event) => {
      console.log('Поздключение закрыто');

    }

    socket.current.onerror = () => {
      console.log('Ошибка');
    }
  }

  const onConnect = (nickname) => {
    setRoom(`${nickname}-${currentUser?.nickname}`)
    if (!room.includes(nickname)) {
      setMessages([]) 
      connection(`${nickname}-${currentUser?.nickname}`) 
    }
  }

  const sendMessage = (value) => {
    const message = {
      event: 'message',
      username: currentUser?.nickname,
      id: Date.now(),
      message: value,
      room
    }
    socket.current.send(JSON.stringify(message))
  }

  const toOnline = nickname => {
    const message = {
      event: 'connection',
      id: Date.now(),
      user: nickname
    }
    publicSocket.current.send(JSON.stringify(message))
  }

  const onDisconnect = (nickname) => {
    const message = {
      event: 'disconnect',
      user: nickname
    }
    console.log('request', message);
    publicSocket.current.send(JSON.stringify(message))
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#181818' }} onClick={() => toOnline(currentUser?.nickname)}>
      <Sidebar isDrawer={isDrawer} onConnect={onConnect} onlineUsers={onlineUsers}/>
      <Home onToggle={toggleDrawerHandler} messages={messages} sendMessage={sendMessage} onDisconnect={onDisconnect}/>
    </div>

  );
}

export default Chat;
