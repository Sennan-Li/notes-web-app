import React, {useState} from 'react'
import NoteFolders from '../components/noteFolders';
import NoteLists from '../components/noteLists';
import NoteContent from '../components/noteContent';
import { useMediaQuery } from 'react-responsive'

import {foldersData} from '../assets/data/folders'
import {notesData} from '../assets/data/notes'
import {useParams} from 'react-router-dom'


export default function Note(props) {
  
  //data
  const [folders, setFolders] = useState(foldersData)
  const [notes, setNotes] = useState(notesData)
  let {id} = useParams()
  const [currentFolder, setCurrentFolder] = useState('all')
  const [currentNote, setCurrentNote] = useState('n1')
  const [searchNote, setSearchNote] = useState('')

  //classes
  const [noteFoldersClasses, setNoteFoldersClasses] = useState('noteFolders')
  const [noteListsClasses, setNoteListsClasses] = useState('noteLists hideForMobile')
  const [noteContentClasses, setNoteContentClasses] = useState('noteContent hideForMobile')
  const mobile = useMediaQuery({ query: '(max-width: 767px)' })


  const [foldersEditDisabled, setFoldersEditDisabled] = useState(true)
  const [newFolderDisabled, setNewFolderDisabled] = useState(true)
  const [noNote, setNoNote] = useState(false)


  //functions
  function handleFolderSelect(e) {
    setCurrentFolder(e)
    setCurrentNote('')
    setNoNote(true)
    setFoldersEditDisabled(true)
    handleFoldersToLists()
    
  }
  function handleNoteSelect(e) {
    setCurrentNote(e)
    setNoNote(false)
    handleListsToNote()
  }
  function handleFoldersToLists() {
    if (mobile) {return (setNoteFoldersClasses('noteFolders hideForMobile'),setNoteListsClasses('noteLists unhide'))}
  }
  function handleListsToNote() {
    if (mobile) {return (setNoteListsClasses('noteLists hideForMobile'), setNoteContentClasses('noteContent unhide'))}
  }
  function handleListsToFolders() {
    if (mobile) {return (setNoteListsClasses('noteLists hideForMobile'), setNoteFoldersClasses('noteFolders unhide'))}
  }
  function handleNoteToLists() {
    if (mobile) {return (setNoteContentClasses('noteContent hideForMobile'), setNoteListsClasses('noteLists unhide'))}
  }
  function handleSearch(e) {
    setSearchNote(e.target.value)
  } 
 

  return (
    <React.Fragment>
      <NoteFolders id={id} folders={folders} setFolders={setFolders} onFolderSelect={handleFolderSelect} currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} foldersEditDisabled={foldersEditDisabled} setFoldersEditDisabled={setFoldersEditDisabled} newFolderDisabled={newFolderDisabled} setNewFolderDisabled={setNewFolderDisabled} setNoNote={setNoNote} notes={notes.filter(note=>{
        if (note.body.toLowerCase().includes(searchNote))return note.body.toLowerCase().includes(searchNote)
        else return note.title.toLowerCase().includes(searchNote)
        })} setNotes={setNotes} noteFoldersClasses={noteFoldersClasses} {...props}/>

      <NoteLists id={id} folders={folders} onNoteSelect={handleNoteSelect} onSearch={handleSearch} notes={notes.filter(note=>{
        if (note.body.toLowerCase().includes(searchNote))return note.body.toLowerCase().includes(searchNote)
        else return note.title.toLowerCase().includes(searchNote)
        })} setNotes={setNotes} currentNote={currentNote} setCurrentNote={setCurrentNote} currentFolder={currentFolder} noteListsClasses={noteListsClasses} setNoNote={setNoNote} setFoldersEditDisabled={setFoldersEditDisabled} onListsToFolders={handleListsToFolders} onListsToNote={handleListsToNote} {...props}/>

      <NoteContent id={id} noteContentClasses={noteContentClasses} notes={notes.filter(note=>{
        if (note.body.toLowerCase().includes(searchNote))return note.body.toLowerCase().includes(searchNote)
        else return note.title.toLowerCase().includes(searchNote)
        })} setNotes={setNotes} currentNote={currentNote} setCurrentNote={setCurrentNote} currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} noNote={noNote} setNoNote={setNoNote} setFoldersEditDisabled={setFoldersEditDisabled} onNoteToLists={handleNoteToLists} {...props} />
    </React.Fragment>

  )
}
