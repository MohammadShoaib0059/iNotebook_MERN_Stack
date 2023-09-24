import React, { useState } from "react";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NoteContext = createContext();
const Notestate = ({ children }) => {
  const host = "http://localhost:4000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const authToken = localStorage.getItem("token");
  // Get all notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add Notes
  const addNotes = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    toast.warn("Your Notes Deleted Successfully!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
   // Edit a Note
   const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
    toast.success("Your Notes Updated Successfully!", {
      position: toast.POSITION.TOP_LEFT,
    });
  }
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getNotes, addNotes, deleteNote ,editNote}}
    >
     <ToastContainer autoClose={2000}/>
      {children}
    </NoteContext.Provider>
  );
};

export default Notestate;
