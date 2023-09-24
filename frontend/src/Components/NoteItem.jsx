import React, { useContext } from 'react'
import { NoteContext } from '../Context/Notes/notestate';

const NoteItem = (props) => {
    const {note,updateNote} = props;
    const {deleteNote} = useContext(NoteContext);
  return (
    <div className='col-md-3' key={note._id}>
      <div className="card my-2">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
  </div>
</div>
    </div>
  )
}

export default NoteItem
