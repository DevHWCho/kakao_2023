import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db, storage } from 'fireB';
import { ref } from 'firebase/database';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';

function Talks(props) {
  // const location = useLocation();
  // console.log("lll>>>>>>", props);
  // const {
  //   state: {
  //     id: chatId
  //   }
  // } = props;

  const {talkObj:
    {
      createdAt, creatorId, text,id,attachmentUrl
    }, 
    isOwner} = props; //객체로 들어온 props를 구조분해할당으로 가져옴. const {} = props; / {속성: {}} 안에 추가로 내용을 나누어서 내보낼 수 있음

    // console.log("TTTT", id)
  const [editing, setEditing] = useState(false);
  const [newTalk, setNewTalk] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, `talks${props.state}`, `/${id}`)); // 폴더 안에 있는 id에 해당되는 문서를 삭제하기 위함. 폴더/문서 구조이기 때문에 앞에 /를 붙인다. 연필 아이콘 눌러보면 그렇게 나옴.
      if(attachmentUrl !== ""){
        const deleteRef = ref(storage, attachmentUrl);
        await deleteObject(deleteRef);
      }
    }
  }
  
  const toggleEditing = () => setEditing((prev) => !prev); //토글 기능
  const onChange = (e) => {
    const {target:{value}} = e;
    setNewTalk(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTalkRef = doc(db, `talks${props.state}`, `/${id}`);

    await updateDoc(newTalkRef, {
      text: newTalk,
      createdAt: Date.now(),
    });
    setEditing(false);
  }

  useEffect (() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    const times = moment(now).format('LT');
    setNowDate(times);
  },[])

  return (
    <>
      {isOwner ? (
        <div className='chat_box my'>
          <div className='chat'>
            {editing ? (
              <>
                <form onSubmit={onSubmit} className='container talksEdit'>
                  <input type='text' onChange={onChange} value={newTalk} required className='formInput' />
                  <input type='submit' value='수정하기' className='formBtn' />
                </form>
                <button onClick={toggleEditing} className='formBtn cancelBtn'>취소</button>
              </>
             ) : (
              <>
                <h4>{text}</h4>
                {attachmentUrl && (// 이렇게 설정하면 이미지 없이 내용만 넣어도 엑박이 안 뜸
                  <img src={attachmentUrl} max-width="350" max-height="400" alt='send_image' />
                )}
                <span className='chat_time' >{nowDate}</span>
                <div className='talks__actions'>
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon='fa-solid fa-trash' style={{color:'#ef3333'}} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon='fa-solid fa-pencil' style={{color:'#555'}} />
                  </span>
                </div>
              </>
             )}
          </div>
        </div>
      ) : (
        <div className='chat_box my' style={{display:'none'}}></div>
      )}
    </>
  )
}

export default Talks
