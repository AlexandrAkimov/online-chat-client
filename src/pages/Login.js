import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../store/actions/userAction';

const Login = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [file, setFile] = useState(null)

  const navigate = useNavigate()

  const changeFileHandler = event => {
    setFile(event.target.files[0])
  }
  const loginHandler = async (isLogin) => {
    try {
      const formData = new FormData()
      formData.append('nickname', nickname)
      formData.append('password', password)
      if (file && !isLogin) {
        formData.append('photo', file)
      } else {
        formData.append('photo', '')
      }
      await dispatch(loginAction(formData, isLogin));
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }


  }
  return (
    <div className="auth">
      <div className="card">
        <label className="label">никнейм</label>
        <input
          className="input"
          type="text"
          value={nickname}
          placeholder="Введите Никнэйм"
          onChange={e => setNickname(e.target.value)} /><br />
        <label className="label">пароль</label>
        <input className="input" type="password" value={password} placeholder="Введите пароль" onChange={e => setPassword(e.target.value)} /><br />
        <input type="file" placeholder="Выберите фото" onChange={changeFileHandler} style={{color: '#7a7a7a'}} /><br />
        <div className="btns">
          <button onClick={() => loginHandler(true)} className="btn">Войти</button>
          <button onClick={() => loginHandler()} className="btn" style={{width: 'auto'}}>Зарегистрироваться</button>
        </div>
        
      </div>

    </div>
  );
}

export default Login;
