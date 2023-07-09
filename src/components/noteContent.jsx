import React from 'react'
import { Link } from "react-router-dom"
import { ImBin } from 'react-icons/im';
import { RiDeviceRecoverLine } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BsBookmarkStar } from 'react-icons/bs';
import { BsBookmarkStarFill } from 'react-icons/bs';
import _uniqueId from 'lodash/uniqueId';



export default function NoteContent({id, notes, setNotes, currentNote, setCurrentNote, currentFolder, setCurrentFolder, noteContentClasses, noNote, setNoNote, setFoldersEditDisabled, onNoteToLists, onCloseOthers}){


  function handleNoteTitleEdit(e) {
    setNotes((notes.map(note => {
      if (note.noteId === currentNote) {
      return {...note, title: e.target.value}
      } else {
      return note
      }
      })))
   }

  function handleNoteBodyEdit(e) {
    setNotes((notes.map(note => {
      if (note.noteId === currentNote) {
      return {...note, body: e.target.value}
      } else {
      return note
      }
      })))
   }

   function handleNoteAdd() {
    const newNote = {
      title: '',
      body: 'New Note',
      noteId: String(_uniqueId('note-')),
      folderId: String(currentFolder),
      date: new Date().toLocaleString(),
      deleted: false,
      favourites:false
    }
    const newFavNote = {
      title: '',
      body: 'New Note',
      noteId: String(_uniqueId('note-')),
      folderId: String(currentFolder),
      date: new Date().toLocaleString(),
      deleted: false,
      favourites:true
    }
    setNotes([...notes, currentFolder==='favourites'?newFavNote:newNote])
    setCurrentNote(currentFolder==='favourites'?newFavNote.noteId:newNote.noteId)
    setNoNote(false)
 }
 function handleNoteFav() {
  setNotes((notes.map(note => {
    if (note.noteId === currentNote) {
    return {...note, favourites: true}
    } else {
    return note
    }
    })))
 }
 function handleNoteUnfav() {
  setNotes((notes.map(note => {
    if (note.noteId === currentNote) {
    return {...note, favourites: false}
    } else {
    return note
    }
    })))
    {if (currentFolder==='favourites') return (setNoNote(true),onNoteToLists())}
 }
 function handleNoteDelete() {
  setNotes((notes.map(note => {
    if (note.noteId === currentNote) {
    return {...note, deleted: true}
    } else {
    return note
    }
    })))
    setNoNote(true)
    onNoteToLists()
 }
 function handleNoteRecover() {
  setNotes((notes.map(note => {
    if (note.noteId === currentNote) {
    return {...note, deleted: false}
    } else {
    return note
    }
    })))
    setCurrentFolder(notes.find(note=>note.noteId===currentNote).folderId)
    onNoteToLists()
 }
 function handleClick(){
  onCloseOthers()
  setFoldersEditDisabled(true)
 }
  return (
    noNote===false?<div className={noteContentClasses} onClick={handleClick}>
        <div className='noteHeader'>
          <div>
            <button className='backBtn' onClick={onNoteToLists}><IoChevronBackOutline/></button>
            {currentFolder==='deleted'?
            <button className='recoverBtn' onClick={handleNoteRecover}><RiDeviceRecoverLine/></button>:
             <Link to={`/notes/${currentFolder}`}><button onClick={handleNoteDelete}><ImBin/></button></Link>}
          </div>

          <div>
          {currentFolder==='deleted'?null:notes.find(note=>note.noteId===currentNote)?.favourites===false?<button className='favBtn' onClick={handleNoteFav}><BsBookmarkStar/></button>:<button className='favBtn' onClick={handleNoteUnfav}><BsBookmarkStarFill/></button>}
            {currentFolder!=='deleted'&&<Link to={`/notes/${currentNote}`}><button className='addBtn' onClick={handleNoteAdd}><MdNoteAdd/></button></Link>}
          </div>

          <hr />
        </div>

        <input type='text' className='noteTitle' placeholder='Give your note a short title...' value={notes.find(note=>note.noteId===currentNote)?.title} onChange={handleNoteTitleEdit}/>
        <textarea className='noteBody' value={notes.find(note=>note.noteId===currentNote)?.body} onChange={handleNoteBodyEdit}></textarea>
    </div>
    :<div className={noteContentClasses} onClick={()=>{setFoldersEditDisabled(true)}}>
        <div className='noteHeader'>
          <div>
            {currentFolder==='deleted'?<button  disabled className='recoverBtn disabled' onClick={handleNoteRecover}><RiDeviceRecoverLine/></button>:
             <button disabled className='disabled' onClick={handleNoteDelete}><ImBin/></button>}
          </div>

            <div>
            {currentFolder!=='deleted'&&<button disabled className='favBtn disabled' onClick={handleNoteFav}><BsBookmarkStar/></button>}
            {currentFolder!=='deleted'&&<Link to={`/notes/${currentNote}`}><button className='addBtn' onClick={handleNoteAdd}><MdNoteAdd/></button></Link>}
          </div>

          <hr />
        </div>
        <div className="noNote">
          <p>No note is selected</p>
        </div>
    </div>
  )
}
