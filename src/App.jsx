import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  const HandleAdd = () => {
    if(task=="")
    {
      alert("Task Can not  be EMPTY!!");
    }
    else
    {
    setTodo([...todo, { task, isComplete: false }]);
    setTask("");
    }
  };
  const HandleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <>
      <div className="AppDiv">
        <div className="Heading">
          <h1>ToDoList</h1>
          <hr />
        </div>
        <div className="input">
          <input
            onChange={HandleChange}
            value={task}
            id="TaskIP"
            type="text"
            placeholder="ADD TASK"
          />
          <button onClick={HandleAdd} id="btnADD">
            {" "}
            ADD
          </button>
        </div>
        <div className="todoheading">
          <h1>Task List</h1>
        </div>
        {todo.map((item) => {
          return (
            <div className="List">
              <div className="MapList">
                <ul>
                  <li>
                    <div className="ListCont">
                      <input id="checkbox" value={todo.isComplete} type="checkbox" />
                      <span id="DisplaySpan">{item.task}</span>
                    </div>
                    <div className="btneditDel">
                      <button id="Edit">EDIT</button>
                      <button id="Delete">DELETE</button>
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
}

export default App;
