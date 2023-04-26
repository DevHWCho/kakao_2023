import { updateProfile } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaCog, FaComment, FaPencilAlt, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { db, storage } from '../fireB';
// import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "styles/MyProfile.scss";
import Header from './Header';

function MyProfile({userObj}) {
  // 헤더
  const state = {title: "", number: "", leftItem: <FaTimes />, rightItem: <FaCog/>, link: "/"}
  console.log("userObj->",userObj);

  // 배경
  const [attachment, setAttachment] = useState("");
  const [newBgImg, setNewBgImg] = useState("");

  // 프로필
  const [newMyPhoto, setNewMyPhoto] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "profile"), 
                  orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id}); 
      });
      if (newArray && newArray.length > 0 && newArray[0].attachmentUrl) {
        setNewBgImg(newArray[0].attachmentUrl);
      }
    });
    },[newBgImg, newMyPhoto]);


  // 배경사진
  const onBgSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/bgImg`); 
        const response = await uploadString(storageRef, attachment, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); 
      }
      const docRef = await addDoc(collection(db, "profile"), {
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      });
    setAttachment("");
  }

  const onFileChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent 
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); 
  }

  const onclearAttachment = () => {
    setAttachment("");
  }  


  // 프로필
  const onImgSubmit = async (e) => {
    e.preventDefault();
    try {
      let newPhotoUrl = "";
      if(newMyPhoto !== ""){
        const storageRef = ref(storage, `${userObj.uid}/profileImg`); 
        const response = await uploadString(storageRef, newMyPhoto, 'data_url'); 
        console.log('response->', response);
        newPhotoUrl = await getDownloadURL(ref(storage, response.ref)); 
        await updateProfile(userObj,{
          photoURL:newPhotoUrl
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNewMyPhoto("");
  }

  const onNameSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj,{
        displayName:newDisplayName,
      });
    }
  }  

  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value)
  }

  const onPhotoChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent 
      setNewMyPhoto(result);
    }
    reader.readAsDataURL(theFile); 
  }

  const onClearMyPhoto = () => {
    setNewMyPhoto("");
  }

  const toggleEditing = () => {
    setEditing((prev) => !prev); 
    onClearMyPhoto();
    onclearAttachment();
  }

  const onDeleteClick = async () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `${userObj.uid}/bgImg`);
    
    // Delete the file
    await deleteObject(desertRef).then(() => {}).catch((error) => {});
    setNewBgImg("");
  }

  const onDeleteProfile = async () => {
    const storage = getStorage();

    const desertRef = ref(storage, `${userObj.uid}/profileImg`);
    await deleteObject(desertRef).then(() => {}).catch((error) => {});
    await updateProfile(userObj,{
      photoURL:'',
    });
    setEditing((prev) => !prev); 
  }
  

  return (
    // 배경
    <div>
      <div className="my_header">
      <Header state={state} />
        <main className="my_main">
        <form onSubmit={onBgSubmit}>
        <section className='mybackground' style={newBgImg ? {backgroundImage: `url("${newBgImg}")`} : null}>
          {editing && (
            <>
              <label htmlFor='bg-attach' className='my_prof_edit'>
                <div className='prof_edit_btn backEdit'>
                  <FontAwesomeIcon icon="fa-solid fa-camera-retro" style={{fontSize: 15}} />
                </div>
              </label>
              <button onClick={onDeleteClick} className='bgDelBtn'>
                <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
              </button>
              <input type='file' accept='image/*' onChange={onFileChange} id='bg-attach' style={{opacity:0}}/>
            </>
          )}
        </section>
        {attachment && (
          <section className="mybackground" style={{backgroundImage: `url("${attachment}")`}}>
            <div className='bgBtn'>
              <button type='submit' className='left_bBtn'>확인</button>
              <button onClick={onclearAttachment} className='right_bBtn'>취소</button>
            </div>
          </section>
        )}
        </form>


        {/* 프로필 */}
        <section className="myprofile" >
          <form onSubmit={onImgSubmit}>
            <h2 className="blind">Profile info</h2>
            {userObj.photoURL !== null ? (
              <>
                <div className="myprofile_img added" style={{backgroundImage: `url("${userObj.photoURL}")`}}>
                  {editing && (
                    <>
                      <label htmlFor='photo-attach' className='my_prof_edit'>
                        <div className='prof_edit_btn'>
                          <FontAwesomeIcon icon="fa-solid fa-camera-retro" style={{fontSize: 15}} />
                        </div>
                      </label>
                      <button onClick={onDeleteProfile} className='bgDelBtn delProf'>
                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                      </button>
                      <input type='file' accept='image/*' onChange={onPhotoChange} id='photo-attach' style={{opacity:0}}/>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className='myprofile_img default'>
                {editing && (
                  <>
                    <label htmlFor='photo-attach' className='my_prof_edit'>
                      <FontAwesomeIcon icon="fa-solid fa-camera-retro" style={{fontSize: 15}} />
                    </label>
                    <button onClick={onDeleteProfile} className='bgDelBtn delProf'>
                      <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                    </button>
                    <input type='file' accept='image/*' onChange={onPhotoChange} id='photo-attach' style={{opacity:0}}/>
                  </>
                )}
              </div>
            )}
            {newMyPhoto && (
            <div className="myprofile_img added" style={{backgroundImage: `url("${newMyPhoto}")`}}>
              <div className='photoBtn'>
                <button type='submit' className='left_pBtn'>확인</button>
                <button onClick={onClearMyPhoto}  className='right_pBtn'>취소</button>
              </div>
            </div>
            )}
          </form>

          <div className="myprofile_cont">
            <span>
              <form onSubmit={onNameSubmit}>
                <input type='text' onChange={onChange} value={newDisplayName} placeholder='이름' style={{border:0,textAlign:"center"}}  className="myprofile_name"/>
              </form>
            </span>
            <input type="mail" className="myprofile_email" placeholder={userObj.email} />
            <ul className="myprofile_menu">
            <li>
              <Link to={"/chats"}>
                <span className="icon">
                  <i><FaComment /></i>
                </span>
                My Chatroom
              </Link>
            </li>
            <li>
              <div onClick={toggleEditing}>
              <span className="icon">
                <i><FaPencilAlt /></i>
              </span>Edit Profile
              </div>
            </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}

export default MyProfile
