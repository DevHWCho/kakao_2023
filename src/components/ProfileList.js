import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileList.scss';

function ProfileList() {
  return (
    <li>
      <Link to={"/profile"}>
        <span className="profile_img empty"></span>
        <span className="profile_name">My Name</span>
        <span className="profile_message">Have a good day, See you soon.</span>
      </Link>
    </li>
  )
}

export default ProfileList
