import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import EmptyAvatar from '../components/EmptyAvatar/EmptyAvatar';
import { updateProfile } from '../store/actions/userAction';

const Profile = () => {
  const fileRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const [name, setName] = useState(currentUser?.nickname)
  const [file, setFile] = useState(null)
  const [previewSrc, setPreviewSrc] = useState('')
  
  const saveProfileHandler = async () => {
    try {
      const formData = new FormData()
      formData.append('nickname', name)
      if (file) {
        formData.append('photo', file)
      } else {
        formData.append('photo', currentUser?.photo)
      }
      await dispatch(updateProfile(formData));
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  const openInputFile = () => {
    fileRef.current.click()
  }

  const fileSelectHandler = event => {
    const fileOne = event.target.files[0]
    setFile(fileOne)

    const reader = new FileReader()

    reader.onload = ev => {
      setPreviewSrc(ev.target.result)
    }

    reader.readAsDataURL(fileOne)
  }
  return (
    <div style={{ padding: '10px', width: '350px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {currentUser ?
        <><label className="label">Ваш никнейм:</label> <br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="input"/> <br /> <br />
          <label className="label">Ваш аватар:</label> <br/>
          {currentUser.photo ?
            <img src={`${previewSrc ? previewSrc : process.env.REACT_APP_API_URL + currentUser?.photo}`} alt="photos" className="img_profile" />
            : <EmptyAvatar big={true} nickname={currentUser.nickname} />

          }
          <input type="file" title="Изменить аватар" style={{display: 'none'}} onChange={fileSelectHandler} ref={fileRef}/>
          <button className="btn_save btn_file" onClick={openInputFile}>Изменить аватар</button>
          <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <button className="btn_save" onClick={saveProfileHandler}>Сохранить</button>
            <button className="btn_back" onClick={() => navigate('/')}>Назад</button>
          </div>
          
        </> : null
      }
    </div>
  );
}

export default Profile;
