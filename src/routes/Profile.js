import React from "react";
import { FaCog, FaComment, FaPencilAlt, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Header from '../components/Header.js';
import '../styles/Profile.scss';

function Profile(props) {
  const location = useLocation();
  console.log("LLLLLLL",location)
  console.log("PPPPPP>",props)
  // console.log(location)
  // const name = location.state.name
  // const photo = location.state.photo
  // const bg = location.state.background
  // const email = location.state.email

  const {
    profId, profName, profPhoto, profEmail, profBack
  } = props;

  const state = {title: "", number: "", leftItem: <FaTimes /> , rightItem: <FaCog/>}

  return (
    <div className="prof_header">
      <Header state={state} />
      <main className="prof_main">
        <section className="kbackground" style={{backgroundImage: `url("${profBack}")`}}>
          <h2 className="blind">Profile background image</h2>
        </section>
        <section className="kprofile">
          <h2 className="blind">Profile info</h2>
          <div className="kprofile_img default" style={{backgroundImage: `url("${profPhoto}")`}}></div>
          <div className="kprofile_cont">
            <span className="kprofile_name">{profName}</span>
            <input type="mail" className="kprofile_email" placeholder={profEmail} />
            <ul className="kprofile_menu">
            <li>
              <Link to={`/chatting/${profId}`}>
                <span className="icon">
                  <i><FaComment /></i>
                </span>
                Chatroom
              </Link>
            </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile
