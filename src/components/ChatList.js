import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatList.scss';

function ChatList({profile}) {
  // console.log({profile})
  return (
    <ul className='chat_list'>
      {profile.map((prof, index)=>
        <li key={index}>
          <Link to={'/chatting'} state={{id:prof.id, name:prof.name, photo:prof.photo, comment:prof.comment, background:prof.background, email:prof.email}} >
            <span className="chats_img empty" style={{backgroundImage: `url("${prof.photo}")`}}></span>
            <span className="chats_cont">
              <span className="chats_name">{prof.name}</span>
              <span className="chats_latest">Hello! This is a test message!</span>
            </span>
            <span className="chats_time"><span>15</span>:<span>33</span></span>
          </Link>
        </li>
      )}
    </ul>
  )
}

export default ChatList
