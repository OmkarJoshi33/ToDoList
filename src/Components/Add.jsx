import React, { useState } from "react";

import "./Add.css";

const Add = () => {
  const [Task, setTask] = useState([]);
  const [todo, settodo] = useState("");
  const [Text, setText] = useState("");
  const [bgImgSrc, setBgImgeSrc] = useState("src/Components/images/box.png");

  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleAdd = (e) => {
    if (todo == "") {
      alert("Empty Task Can not be added!!");
    } else {
      setTask([...Task, { todo, isComplete: false }]);
      settodo("");
    }
  };

  const handledit = () => {};
  const handldelete = () => {};

  const handlebgImg = () => {
    setBgImgeSrc("src/Components/images/checked.png");
    setText("updateLI");
  };

  return (
    <>
      <div className="ADD">
        <input
          onChange={handleChange}
          value={todo}
          type="text"
          placeholder="ADD TASK"
        />
        <button id="btn1" onClick={handleAdd}>
          {" "}
          ADD
        </button>
      </div>
      <h2>Todo List</h2>
      <div className="list">
        {Task.map((item) => {
          return (
            <div className="con">
              <div className="x">
                <ul>
                  <li>
                    <button id="imgbtn" onClick={handlebgImg}>
                      <img className="img" src={bgImgSrc} />
                    </button>
                    <span id={Text}> {item.todo}</span>
                    <div className="px">
                    <button className="edit">edit</button>
                    <button className="delete">delete</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Add;
