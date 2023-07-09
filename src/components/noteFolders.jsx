import React from 'react'
import { Link } from "react-router-dom"
import { MdFolderOpen } from 'react-icons/md';
import { MdFolder } from 'react-icons/md';
import { MdFolderDelete } from 'react-icons/md';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { MdFolderSpecial } from 'react-icons/md';
import { ImBin } from 'react-icons/im';
import _uniqueId from 'lodash/uniqueId';

export default function NoteFolders({id, folders, setFolders, onFolderSelect, currentFolder, setCurrentFolder, foldersEditDisabled, setFoldersEditDisabled, newFolderDisabled, setNewFolderDisabled, notes, setNotes, noteFoldersClasses, onCloseOthers}) {

  function handleFolderDelete(e) {
   
    setNotes((notes.map(note => {
      if (note.folderId === e) {
      return {...note, deleted: true}
      } else {
      return note
      }
      })))
    setFolders(folders.filter(folder=>folder.folderId !== e))
   
    setCurrentFolder('all')

  }

  function handleFolderAdd(e) {
    const newFolder = {
      name: 'New Folder',
      folderId: String(_uniqueId('folder-'))
    }
    setFolders([...folders, newFolder])
    setCurrentFolder(newFolder.folderId)
    setFoldersEditDisabled(true)
    setNewFolderDisabled(false)
 }
 function handleFolderEdit(e) {
  
  setFolders((folders.map(folder => {
    if (folder.folderId === currentFolder) {
    return {...folder, name: e.target.value}
    } else {
    return folder
    }
    })))
 }

  return (
    <div className={noteFoldersClasses} onClick={onCloseOthers}>
      <div className="folders" onClick={()=>{setNewFolderDisabled(true)}}>
      <h3>Folders</h3>
        <div className={!foldersEditDisabled?'disabled':null}>
          <Link to={`/notes/all`} onClick={()=>onFolderSelect('all')}  >
              <div onClick={()=>{setFoldersEditDisabled(true)}} className={(currentFolder === 'all')?'noteFolderItem noteFolderItemActive':'noteFolderItem'}>
                  <MdFolder className='noteFolderIcon'/>
                  <h4>All notes</h4>
              </div>
          </Link>
        </div>
        <div className={!foldersEditDisabled?'disabled':null}>
          <Link to={`/notes/favourites`} onClick={()=>onFolderSelect('favourites')}>
              <div onClick={()=>{setFoldersEditDisabled(true)}} className={(currentFolder === 'favourites')?'noteFolderItem noteFolderItemActive':'noteFolderItem'}>
                  <MdFolderSpecial className='noteFolderIcon'/>
                  <h4>Favourites</h4>
              </div>
          </Link>
        </div>
      
      {foldersEditDisabled===true
      ?folders.map(folder => (
        <Link key={folder.folderId} to={`/notes/${folder.folderId}`} onClick={()=>onFolderSelect(folder.folderId)} >
            <div className={(currentFolder === folder.folderId)?'noteFolderItem noteFolderItemActive':'noteFolderItem'}>
                <MdFolderOpen className='noteFolderListIcon'/>
                <input disabled={newFolderDisabled} autoFocus type="text" value={folder?.name} onChange={handleFolderEdit}/>
            </div>
        </Link>
      ))
      :folders.map(folder => (
            <div key={folder.folderId} className='noteFolderItem' onClick={()=>setCurrentFolder(folder.folderId)}>
                <ImBin onClick={()=>handleFolderDelete(folder.folderId)} className='noteFolderListIcon noteFolderDeleteIcon' style={{color: 'red'}}/>
              <input className='editInput' type="text" value={folder?.name} onChange={handleFolderEdit}/>
            </div>
      ))}


      <div className={!foldersEditDisabled?'disabled':null}>
        <Link to={`/notes/deleted`} onClick={()=>onFolderSelect('deleted')}>
              <div onClick={()=>{setFoldersEditDisabled(true)}} className={(currentFolder === 'deleted')?'noteFolderItem noteFolderItemActive':'noteFolderItem'}>
                  <MdFolderDelete className='noteFolderIcon noteFolderDeletedIcon'/>
                  <h4>Deleted notes</h4>
              </div>
        </Link>
      </div>
      </div>

      <div className="noteFoldersFootage">
        <div>
          {foldersEditDisabled===true?<button onClick={()=>{setFoldersEditDisabled(false)}}>Edit</button>:<button onClick={()=>{setFoldersEditDisabled(true)}}>Done</button>}

          <button onClick={handleFolderAdd}><MdOutlineCreateNewFolder/></button>
          </div>
        <hr />
      </div>

      <hr className='noteFoldersDivider'/>
    </div>
  )
}
