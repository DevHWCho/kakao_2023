import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronLeft, FaMicrophone, FaSearch, FaSmile } from 'react-icons/fa';
import { Link, useLocation} from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import Talks from 'components/Talks';
import { addDoc, collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import { db, storage } from 'fireB';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Chatting.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Chatting(props) {
  // console.log("userObj>>>",{userObj})
  const location = useLocation();
  // console.log("pppppppp>>",location)
  // // console.log("location>>>",location)
  const link = location.pathname

  const {
    userObj,
    profId, profName, profPhoto, profEmail, profBack 
  } = props;

  // console.log("PPP<<", userObj)


  // 헤더용
  const state = {title: profName, number: "", leftItem: <FaChevronLeft /> , rightItem: <><FaSearch /> <FaBars /></>, link: "/chats"}
  
  // fetch('https://jsonplaceholder.typicode.com/posts')
  // .then((response) => response.json())
  // .then((json) => console.log(json));

  
    // const [posts, setPosts] = useState([]);
    const [talks, setTalks] = useState([]);

    useEffect(() => {
      // axios.get('https://jsonplaceholder.typicode.com/posts')
      //   .then(response => {
      //     setPosts(response.data);
      //   });

      const q = query(collection(db, `talks${profId}`), 
                         orderBy("createdAt","asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(), id:doc.id}); 
        });
        setTalks(newArray);
        // console.log(newArray)
        if (newArray && newArray.length > 0 && newArray[0].attachmentUrl) {
          setNewAttachment(newArray[0].attachmentUrl);
        }
      });  
    },[]);

  const [talk, setTalk] = useState("");
  const [attachment, setAttachment] = useState("");
  const [newAttachment, setNewAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); 
        const response = await uploadString(storageRef, attachment, 'data_url'); 
        console.log('response->', response);
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); 
      }
      const docRef = await addDoc(collection(db, `talks${profId}`), {
        text: talk,
        createdAt: Date.now(),
        creatorId: userObj.uid, 
        attachmentUrl
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding document: ", e);
    }
    setTalk("");
    setAttachment("");
  }

  const onChange = e => {
    e.preventDefault();
    const {target: {value}} = e;
    setTalk(value);
  }

  const onFilechange = (e) => {
    // console.log("e->",e)
    const {target: {files}} = e;
    
    const theFile = files[0];
    // console.log('theFile->', theFile); 
    
    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      // console.log("finishedEvent->",finishedEvent)
      const {currentTarget: {result}} = finishedEvent 
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); 
  }

  const onclearAttachment = () => {
    setAttachment(""); 
  }

  // 채팅 입력하면 맨 아래로 스크롤 이동
  const messageEndRef = useRef(null);
  // console.log("ref>>>>>>>", messageEndRef);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    scrollToBottom()
  },[talks]);
  
  return (
  <div>
    <div className='chatting_header'>
    <Header leftItem state={state} />
    </div>  
    <main className='chatting'>
      <span className="date_info">Tuesday, March 23, 2023</span>
      <div className="chat_box my">
        <span className="chat">Hello!</span>
        <span className="chat">Hello! This is a test message. Hello! This is a test message. Hello! This is a test message.</span>
        <span className="chat">This is a test message.</span>
        <span className="chat_time"><span>15</span>:<span>33</span></span>
      </div>
      <div className="chat_box other">
        <Link to={`/profile/${profId}`} state={link} >
          <span className="profile_img empty" style={{backgroundImage: `url("${profPhoto}")`}}></span>
        </Link>
        <span className="profile_name">{profName}</span>
        {/* {posts.map(post => 
           <span key={post.id} className="chat">{post.title}</span>
        )} */}
        <span className='chat'>안녕하세요!</span>
        <span className="chat_time"><span>17</span>:<span>33</span></span>
      </div>
      {talks.map(talk => (
        <>
          <Talks key={talk.id} talkObj={talk} isOwner={talk.creatorId === userObj.uid} state={profId} />
        </>
      ))}
    </main>
    <footer>
      <div>
        <input type='file' accept='image/*' onChange={onFilechange} id='img-attach' style={{display:`none`}}/>
        <label htmlFor='img-attach' className='plus_btn'>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </label>
      </div>
      <form action="/" method="post" onSubmit={onSubmit}>
      <fieldset className="text_box">
        <legend className="blind">채팅 입력창</legend>
        <label htmlFor="chatting" className="blind">채팅 입력</label>
        <input type="text" id="chatting" className="text_field" onChange={onChange} value={talk}/>
        <button type='submit' className='send_btn'>보내기</button>
        <span className="emoticon_btn"><i><FaSmile /></i></span>
        <span className="voice_btn"><i><FaMicrophone /></i></span>
      </fieldset>
      </form>
    </footer>
    <div ref={messageEndRef} />
  </div>
  )
}

export default Chatting
