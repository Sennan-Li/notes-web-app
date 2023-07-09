import React from 'react'
import notes from '../assets/images/notes.png'
import todo from '../assets/images/todo.png'
export default function Others() {
  return (
    <div className="others">
        <p>Apps</p>
        <div className="icons">
         <a href="https://notes.sennanli.com/"><div className='icon'> <img src={notes} alt="" /><p>Notes</p></div></a>
         <a href="https://todo.sennanli.com/"><div className='icon'> <img src={todo} alt="" /><p>To Do</p></div></a>
        </div>
      </div>
  )
}
