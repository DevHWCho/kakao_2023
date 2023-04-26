import React from 'react';
import { FaEllipsisH } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/TabBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabBar() {
  return (
    <nav className="tab_bar">
      <ul>
        <li><Link to={'/'} ><i><FontAwesomeIcon icon="fa-solid fa-user" /></i>Friends</Link></li>
        <li><Link to={'/Chats'} ><i><FontAwesomeIcon icon="fa-solid fa-comments" /></i>Chats</Link></li>
        <li><Link to={'/Find'} ><i><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></i>Find</Link></li>
        <li><Link to={'/More'} ><i><FaEllipsisH /></i>More</Link></li>
      </ul>
    </nav>
  )
}

export default TabBar
