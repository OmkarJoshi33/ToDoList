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
    <div className="container py-11 px-20 h-full w-full flex align-middle justify-center aspect-auto">
      <div className="container  px-10 py-10 aspect-4/6 h-auto w-4/6 bg-slate-100 rounded-3xl shadow-2xl text-wrap">
        <div className="flex py-11 px-11 align-middle justify-center">
          <h1 className="text-6xl text-orange-600 font-bold underline decoration-2 underline-offset-4">
            ToDoList
          </h1>
        </div>
        <div className="flex align-middle justify-evenly">
          <input
            className="rounded-3xl m-3 p-2 ps-8 w-3/5 text-lg outline-none text-center"
            onChange={handleChange}
            value={task}
            id="TaskIP"
            type="text"
            placeholder="ADD TASK"
          />
          <button
            onClick={handleAdd}
            id="btnADD"
            className="rounded-3xl m-3 w-20 p-2 text-lg text-white font-bold bg-orange-600"
          >
            ADD
          </button>
        </div>
        <div className="items-center">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="h-4 m-3 w-4 "
          />
          Show Finished
        </div>
        <div className="todoheading m-4 px-6">
          <h1 className="text-xl text-slate-500">Task List</h1>
        </div>

        {todo.length === 0 && (
          <div className="flex m-5 mx-60 my-12 justify-center">
            NO TODOS TO DISPLAY
          </div>
        )}

        {todo.map((item) => {
          //returns the main content
          return (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="container flex max-w-5/6">
                <div className="container flex max-w-5/6">
                  <ul className="container flex max-w-5/6">
                    <li className="flex w-5/6 items-center">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        type="checkbox"
                        className="flex h-5 w-5 m-2"
                      />
                      <div className="flex items-center  ">
                        <div className="flex w-96 overflow-y-auto">
                          <span
                            className={item.isCompleted ? "line-through " : ""}
                          >
                            {item.task}
                          </span>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="m-1 p-1 text-white h-auto rounded-xl bg-orange-600"
                            id="Edit"
                            aria-label={`Edit task ${item.task}`}
                          >
                            <MdOutlineModeEditOutline className="h-5 w-5 m-1" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="m-1 p-2  text-white rounded-xl bg-orange-600"
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
