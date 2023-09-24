
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [credential,setCredential] =useState({
    name:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const handleChange =(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value});
  }
  const handleSubmit = async(e)=>{
e.preventDefault();
const response = await fetch(`http://localhost:4000/api/auth/createuser`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
});
const json = await response.json();
if(json.success){
  toast.success("Account Created Successfully!", {
    position: toast.POSITION.TOP_LEFT,
  });
  setTimeout(()=>{
    navigate("/login")
  },2000)
}else{
  toast.error("Account Already Exist!", {
    position: toast.POSITION.TOP_LEFT,
  });
}
  }
  return (
    <div className="d-flex justify-content-around align-item-center p-4">
    <form onSubmit={handleSubmit} className="p-4 border border-dark rounded-4">
    <h3>Sign Up</h3>
    <ToastContainer autoClose={1500}/>
    <div className="form-group p-2">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={credential.name}
          id="exampleInputName"
          aria-describedby="nameHelp"
          placeholder="Enter Name"
          required
          minLength={5}
        />
      </div>
      <div className="form-group p-2">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
          value={credential.email}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group p-2">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange}
          value={credential.password}
          name="password"
          id="exampleInputPassword1"
          placeholder="Password"
          required
          minLength={5}
          autoComplete="password"
        />
      </div>
      <div className="p-2">
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      </div>
    </form>
  </div>
  )
}

export default Signup
