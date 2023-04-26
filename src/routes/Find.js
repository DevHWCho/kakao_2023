import React from 'react';
import { FaAddressBook, FaEnvelope, FaMobile, FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import '../styles/Find.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Find() {
  const state = {title: "Find", number: "", leftItem: "Edit" , rightItem: ""}

  return (
    <div>
      <Header state={state} />
      <main>
        <ul className='find_method'>
          <li>
            <Link to={'/#'}>
            <i><FontAwesomeIcon icon="fa-solid fa-person-chalkboard" /></i>
              Find
            </Link>
          </li>
          <li>
            <Link to={'/#'}>
              <i><FontAwesomeIcon icon="fa-solid fa-qrcode" /></i>
              QR Code
            </Link>
          </li>
          <li>
            <Link to={'/#'}>
              <i><FontAwesomeIcon icon="fa-solid fa-mobile" /></i>
              Shake
            </Link>
          </li>
          <li>
            <Link to={'/#'}>
              <i><FontAwesomeIcon icon="fa-solid fa-envelope-circle-check" /></i>
              Invite via SMS
            </Link>
          </li>
        </ul>
        <section className='recommended_section'>
          <header><h2>Recommended Friends</h2></header>
          <ul>
            <li>You have no recommended friends.</li>
          </ul>
        </section>
      </main>
      <div className='find_tab'>
        <TabBar />
      </div>
    </div>
  )
}

export default Find
