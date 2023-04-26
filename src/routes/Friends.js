import React from 'react'
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import TabBar from '../components/TabBar';
import '../styles/Friends.scss';

function Friends({profile, userObj}) {
  const state = {title: "Friends", number: "7", leftItem: "Manage", rightItem: <FaCog/>}
  // console.log("userObj->",userObj);

  

  return (
    <div>
      <Header state={state} />
      <main><SearchBox />
      <section className='main_section'>
        <header className='profile_list'><h2>My Profile &gt;</h2></header>
        <ul className='profile_lists'>
          <li>
            <Link to={"/myprofile"} >
              {userObj.photoURL !== null ? (
                <span className="profile_img default" style={{backgroundImage: `url("${userObj.photoURL}")`}}></span>
              ) : (
                <span className="profile_img default"></span>
              )}
              <span className="profile_name">{userObj.displayName}</span>
            </Link>
            <span className="profile_message">코딩 공부 중입니다.</span>
          </li>
        </ul>
      </section>
      <section className='main_section'>
        <header className='profile_list'><h2>Friends &gt;</h2></header>
        <ul className='profile_lists'>
          {profile.map((prof, index)=>
          <li key={index}>
             <Link to={`/profile/${prof.id}`} state={{id:prof.id, name:prof.name, photo:prof.photo, comment:prof.photo, background:prof.background, email:prof.email, link: '/'}}>
               <span className="profile_img default" style={{backgroundImage: `url("${prof.photo}")`}}></span>
               <span className="profile_name">{prof.name}</span>
             </Link>
             <span className="profile_message">{prof.comment}</span>
           </li>
          )}
        </ul>
      </section>
      </main>
      <div className='friends_tab'>
        <TabBar />
      </div>
    </div>
  )
}

export default Friends
