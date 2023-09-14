import React, { useContext, useEffect } from 'react'
import { NoteContext } from '../Context/Notes/notestate';

const About = () => {
  const {data,update}= useContext(NoteContext);
  useEffect(()=>{
    update()
  },[])
  return (
    <div>
     <h1>{data.name} is good {data.name === "Shoaib" ? "boy":"girl"} and {data.name === "Shoaib" ? "he":"she"} is in class {data.class}</h1>
    </div>
  )
}

export default About
