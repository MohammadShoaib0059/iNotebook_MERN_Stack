import React, { useContext, useState } from "react";
import { NoteContext } from "../Context/Notes/notestate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddNotes = () => {
  const { addNotes } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    console.log(note);
    toast.success("Your Notes Added Successfully!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  return (
    <div className="container">
      <h2>Your can data here</h2>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit}>
        <div className="form-group p-2">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter your title"
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group p-2">
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="description"
            onChange={handleChange}
            placeholder="Enter your desc..."
          ></textarea>
        </div>
        <div className="form-group p-2">
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            placeholder="tags"
          />
        </div>
        <div className="p-2">
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
