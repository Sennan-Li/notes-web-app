import React from 'react'
import logo from '../assets/images/sennanli-logo(dark).png'
import { CgMenuGridO } from "react-icons/cg";

export default function Header({onOpenOthers}) {
  return (
    <div className='header'>
      <div className='headerItems'>
        <div className='logo'>
          <a href="https://sennanli.com/"><img src={logo} alt="" /></a>
          <a href='/notes'><p>Notes</p></a>
        </div>

      <div className='moreMenu'>
        <button onClick={onOpenOthers}><CgMenuGridO/></button>
      </div>
      </div>


      <hr />
    </div>
  )
}
