import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

import "./App.css";

function App() {
  const [task, setTask] = useState(""); //single task
  const [todo, setTodo] = useState([]); //arry to store task
  const [showFinished, setShowFinished] = useState(true); //for showing finished tasks

  //useEffect to strore data in local storeage and even after refresh
  useEffect(() => {
    const todoString = localStorage.getItem("todo");
    if (todoString) {
      try {
        const todo = JSON.parse(todoString);
        setTodo(todo);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        setTodo([]); // Reset to empty array if parsing fails
      }
    }
  }, []);

  //fuction to store tasks on local storege
  const saveToLocal = (updatedTodo) => {
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  //fuction to handdle on click for add event of task
  const handleAdd = () => {
    if (task.trim() === "") {
      alert("You Cannot ADD an empty TASK");
    } else {
      const newTodo = [...todo, { id: uuidv4(), task, isCompleted: false }];
      setTodo(newTodo);
      saveToLocal(newTodo);
      setTask("");
    }
  };
  // function to activate input filed
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  //fuction to toggle the finshied task
  const toggleFinished = () => {
    setShowFinished((prev) => !prev);
  };
  //fuction to handlle check box - toggle and check checkbox of task
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodo = todo.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodo(newTodo);
    saveToLocal(newTodo);
  };
  //function to handle delete
  const handleDelete = (id) => {
    if (window.confirm("DO YOU WANT TO DELETE")) {
      const updatedTodo = todo.filter((item) => item.id !== id);
      setTodo(updatedTodo);
      saveToLocal(updatedTodo);
    }
  };
  //fuction to handle edit
  const handleEdit = (id) => {
    const itemToEdit = todo.find((item) => item.id === id);
    if (itemToEdit) {
      setTask(itemToEdit.task);
      const updatedTodo = todo.filter((item) => item.id !== id);
      setTodo(updatedTodo);
      saveToLocal(updatedTodo);
    }
  };

  return (
    <div className="2xl:container py-14 px-20 2xl:h-full 2xl:w-full flex align-middle justify-center aspect-auto sm:w-auto sm:h-auto" >
      <div className="2xl:container  aspect-4/6 2xl:h-full 2xl:w-4/6 bg-slate-100 rounded-3xl shadow-2xl text-wrap sm:h-auto sm:w-auto">
        <div className="2xl:container flex 2xl:py-10 2xl:px-10 align-middle justify-center sm:px-1 sm:py-1 w-full items-center ">
          <h1 className="2xl:container 2xl:text-5xl  text-orange-600 font-bold underline decoration-2 underline-offset-4 hover:text-orange-400 hover:animate-bounce duration-75 text-4xl w-full h-auto flex justify-center">
            ToDoList
          </h1>
        </div>
        <div className="2xl:container flex align-middle justify-evenly ">
          <input
            className="2xl:container rounded-3xl 2xl:m-3 2xl:p-2 2xl:ps-8 2xl:w-3/5 2xl:text-lg outline-none text-center hover:bg-gray-50 m-3 p-2 ps-8 w-3/5 text-lg "
            onChange={handleChange}
            value={task}
            id="TaskIP"
            type="text"
            placeholder="ADD TASK"
          />
          <button
            onClick={handleAdd}
            id="btnADD"
            className="2xl:container rounded-3xl 2xl:m-3 2xl:w-20 2xl:p-2 2xl:text-lg text-white font-bold bg-orange-600 hover:bg-orange-400  m-3 w-20 p-2 text-lg"
          >
            ADD
          </button>
        </div>
        <div className="2xl:container items-center 2xl:text-lg text-gray-600 2xl:m-7 text-lg mx-6">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="h-4 m-3 w-4  "
          />
          Show Finished
        </div>
        <div className=" 2xl:container 2xl:mx-10 2xl:m-4 2xl:px-6 px-12">
          <h1 className="text-xl text-slate-500">Task List</h1>
        </div>

        {todo.length === 0 && (
          <div className="2xl:container flex 2xl:m-5 2xl:mx-60 2xl:my-12 justify-center">
            NO TODOS TO DISPLAY
          </div>
        )}

        {todo.map((item) => {
          //returns the main content
          return (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="2xl:container flex 2xl:max-w-5/6 2xl:m-1">
                <div className="2xl:container flex 2xl:max-w-5/6 ">
                  <ul className="2xl:container flex 2xl:h-full  2xl:max-w-5/6 ">
                    <li className="2xl:container flex 2xl:w-5/6 items-center 2xl:mx-36 m-1 sm:w-3/4">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        type="checkbox"
                        className="flex h-5 w-5"
                      />
                      <div className="2xl:container flex items-center 2xl:mx-2  2xl:text-lg text-lg">
                        <div className="2xl:container flex 2xl:w-5/6 overflow-y-auto lg:w-[500px]  xl:w-[800px]  sm:w-[300px] w-[200px]">
                          <span
                            className={item.isCompleted ? "line-through " : ""}
                          >
                            {item.task}
                          </span>
                        </div>

                        <div className="container w-full h-full flex ">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="m-1 p-1 text-white h-auto rounded-xl bg-orange-600 hover:bg-orange-500"
                            id="Edit"
                            aria-label={`Edit task ${item.task}`}
                          >
                            <MdOutlineModeEditOutline className="h-5 w-5 m-1" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="m-1 p-2  text-white rounded-xl bg-orange-600 hover:bg-orange-500"
                            id="Delete"
                            aria-label={`Delete task ${item.task}`}
                          >
                            <MdDeleteOutline className="h-5 w-5 m-1" />
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default App;
