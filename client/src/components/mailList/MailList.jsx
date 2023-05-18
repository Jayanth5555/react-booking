import React from 'react'
import "./mailList.css"
const MailList = () => {
  return (
    <div className="mail">
        <div className="mailTitle">Save time,Save money!</div>
        <span className='mailDesc'>Sign up and We'll Send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList
