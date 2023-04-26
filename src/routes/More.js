import React from 'react';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import UserMenu from '../components/UserMenu';
import PlusFriends from '../components/PlusFriends';
import '../styles/More.scss';
import TabBar from '../components/TabBar';
import { FaCog } from 'react-icons/fa';

function More(props) {
  const state = {title: "More", number: "", leftItem: "" , rightItem: <FaCog /> }
  // console.log(props)

  return (
    <div>
      <Header state={state} />
      <main>
        <UserInfo props={props} />
        <UserMenu />
        <PlusFriends />
      </main>
      <div className='more_tab'>
        <TabBar />
      </div>
    </div>
  )
}

export default More
