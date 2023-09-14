import React, { useState } from "react";
import { createContext } from "react";

export const NoteContext = createContext();
const Notestate = ({ children }) => {
  const [data, setData] = useState({
    name: "Shoaib",
    class: 10,
  });
  const update = () => {
    setTimeout(() => {
      setData({
        name: "Tasnim",
        class: 8,
      });
    }, 5000);
  };
  return (
    <NoteContext.Provider value={{ data, update }}>
      {children}
    </NoteContext.Provider>
  );
};

export default Notestate;
