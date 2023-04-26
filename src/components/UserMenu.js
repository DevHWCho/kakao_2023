import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
// import { FaHandPeace, FaPaintBrush, FaSmile, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function UserMenu() {
  return (
    <section className="user_menu">
      <h2 className="blind">사용자 메뉴</h2>
      <ul>
        <li>
          <Link to={"/#"}>
            <i><FontAwesomeIcon icon="fa-solid fa-face-laugh-squint" /></i>
            Emoticons
          </Link>
        </li>
        <li>
          <Link to={"/#"}>
            <i><FontAwesomeIcon icon="fa-solid fa-brush" /></i>
            Themes
          </Link>
        </li>
        <li>
          <Link to={"/#"}>
            <i><FontAwesomeIcon icon="fa-solid fa-person-circle-plus" /></i>
            Plus Friends
          </Link>
        </li>
        <li>
          <Link to={"/#"}>
            <i><FontAwesomeIcon icon="fa-solid fa-id-card" /></i>
            Account
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default UserMenu
