import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faMoon, faPlane, faWifi } from "@fortawesome/free-solid-svg-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";

function Header(props) {
  // console.log(props)

  const [timer, setTimer] = useState("00:00");
  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}:${minutes}`)
  }
  const startTimer = () => {
    setInterval(currentTimer, 1000)
  }

  startTimer()

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <header className="header" >
      <div className="status_bar">
        <div className="left_item">
          <FontAwesomeIcon icon={faPlane} />
          <FontAwesomeIcon icon={faWifi} />
        </div>
        <div className="center_item">
        <span>{timer}</span>
        </div>
        <div className="right_item">
          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faBluetooth} />
          <span><span>100</span>%</span>
          <FontAwesomeIcon icon={faBatteryFull} />
        </div>
      </div>
      <div className="title_bar">
        <h1>{props.state.title} <span>{props.state.number}</span></h1>
        <div className="left_item"><Link to={""} onClick={goBack}>{props.state.leftItem}</Link></div>
        <div className="right_item"><Link to={"/"}>{props.state.rightItem}</Link></div>
      </div>
    </header>
  )
}

export default Header
