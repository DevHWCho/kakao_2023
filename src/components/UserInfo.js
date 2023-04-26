import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authService } from 'fireB';
import React from 'react'
import { FaComment } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function UserInfo({props}) {
  console.log(props)  
  const {
    userObj : {
      displayName, email, photoURL
    } 
  } = props;

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/')
  }


  return (
    <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profile_img default' style={photoURL ? {backgroundImage: `url(${photoURL})`}: null}></span>
        <span className="profile_info">
          <span className="profile_name">{displayName}</span>
          <span className="profile_email">{email}</span>
        </span>
        <span className="chat_img">
          <Link to={"/chats"}>
            <i><FaComment /></i>
          </Link>
        </span>
        <span className='logout' onClick={onLogOutClick}>
          <FontAwesomeIcon icon="fa-solid fa-power-off" />
        </span>
      </section>
  )
}

export default UserInfo
