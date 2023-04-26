import React from 'react'
import { Link } from 'react-router-dom'

function MoreApp() {
  return (
    <section className="more_app">
      <h2 className='blind'>앱 더보기</h2>
      <ul>
        <li><Link to={"/#"}><span className="app_icon"></span>Kakao Story</Link></li>
        <li><Link to={"/#"}><span className="app_icon"></span>Path</Link></li>
        <li><Link to={"/#"}><span className="app_icon"></span>Kakao Friends</Link></li>
      </ul>
    </section>
  )
}

export default MoreApp
