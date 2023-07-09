import React from 'react'
import { Link } from "react-router-dom"
import { FcSearch } from 'react-icons/fc';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdNoteAdd } from 'react-icons/md';
import _uniqueId from 'lodash/uniqueId';

export default function NoteLists({noteListsClasses, id, notes, setNotes, currentNote, setCurrentNote, currentFolder, onSearch, onNoteSelect, setNoNote, setFoldersEditDisabled, folders, onListsToFolders, onListsToNote, onCloseOthers}) {

  const filteredNotes = currentFolder==='all'?notes:currentFolder==='favourites'?notes.filter(note=>note.favourites===true):currentFolder==='deleted'?notes.filter(note=>note.deleted===true):notes.filter(note=>note.folderId===currentFolder)

  const selectedNotes = currentFolder==='deleted'?filteredNotes:filteredNotes.filter(note=>note.deleted===false)
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
 function handleClick(){
  onCloseOthers()
  setFoldersEditDisabled(true)
 }

  return (
    <div className={noteListsClasses} onClick={handleClick}> 

      <hr className='noteListsDivider'/>

      <div className="noteListsHeader">
        <div>
        <button className='backBtn' onClick={onListsToFolders}><IoChevronBackOutline/></button>
        <h3>{currentFolder==='all'?'All Notes':currentFolder==='favourites'?'Favourites':currentFolder==='deleted'?'Deleted Notes':folders.find(folder=>folder.folderId===currentFolder)?.name}</h3>
        </div>
        <button className='addBtn' onClick={handleNoteAdd}><MdNoteAdd/></button>
      </div>

      <h5 className={selectedNotes.length===0?'unhide':'hide'}>No Notes</h5>
      
      <div className='searchBar'>
        <FcSearch className='searchBarIcon'/>
        <input autoFocus type="text" placeholder='Search all notes...' onChange={onSearch}/>
      </div>
     

      <div className="notes">
      {selectedNotes.map(note => (
        <div key={note.noteId} className={(currentNote === note.noteId)?'noteListItem noteListItemActive':'noteListItem'}>
          <Link to={`/notes/${note.noteId}`} onClick={()=>onNoteSelect(note.noteId)} >
            <h4>{note.title}</h4>
            <p className='noteBody'>{note.body}</p>
            <p className='noteDate'>{note.date}</p>
            <hr/>
          </Link>
        </div>
      ))}
      </div>
    </div>
  )
}
