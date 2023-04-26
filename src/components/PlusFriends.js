import React from 'react';
import { FaGraduationCap, FaHome, FaInfoCircle, FaLandmark, FaPencilAlt, FaTv, FaUtensils, FaVideo, FaWonSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/PlusFriends.scss';

export default function PlusFriends() {
  return (
    <>
    <section className="plus_friends">
      <header>
        <h2>Plus Friends</h2>
        <span><i><FaInfoCircle /></i> Learn More</span>
      </header>
      <ul className="plus_list">
      <li><Link to={"/#"}><i><FaUtensils /></i>Order</Link></li>
      <li><Link to={"/#"}><i><FaHome /></i>Store</Link></li>
      <li><Link to={"/#"}><i><FaTv /></i>TV Channel/Radio</Link></li>
      <li><Link to={"/#"}><i><FaPencilAlt /></i>Creation</Link></li>
      <li><Link to={"/#"}><i><FaGraduationCap /></i>Education</Link></li>
      <li><Link to={"/#"}><i><FaLandmark /></i>Politics/Society</Link></li>
      <li><Link to={"/#"}><i><FaWonSign /></i>Finance</Link></li>
      <li><Link to={"/#"}><i><FaVideo /></i>Movies/Music</Link></li>
      </ul>
    </section>
    </>
  )
}
