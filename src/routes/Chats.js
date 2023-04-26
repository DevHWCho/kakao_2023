import React from "react";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import TabBar from "../components/TabBar";
import '../styles/Chats.scss';

function Chats({profile, userObj}) {
  const state = {title: "Chats", number: "", leftItem: "Edit" , rightItem: ""}
  console.log("user->>",userObj);

  return (
    <div>
      <Header state={state} />
      <main>
        <SearchBox />
        <section className='main_section'>
          <header className="blind"><h2>메인섹션</h2></header>
          <ul className='chat_list'>
          {profile.map((prof, index)=>
            <li key={index}>
              <Link to={`/chatting/${prof.id}`} state={{id:prof.id, name:prof.name, photo:prof.photo, comment:prof.comment, background:prof.background, email:prof.email}}>
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
        </section>
        <div className="chat_fa_btn">
          <Link to={"/#"}>
            <FaComment />
          </Link>
        </div>
      </main>
      <div className="chats_tab">
        <TabBar />
      </div>
    </div>
  )
}

export default Chats
