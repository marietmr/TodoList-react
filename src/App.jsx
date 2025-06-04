import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarComponent from "./components/FullCalendar";


function Form({ onAddTodo }) {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  function handleSubmit(event) {
    event.preventDefault();

    if (task.trim() === "") return;

    onAddTodo(task);
    setTask("");
    setStartDate(new Date());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo"
        placeholder="Write a new todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />  
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat={"dd/MM/YYYY HH:mm"}
        showTimeSelect
      />
      <button type="submit">Add todo</button>
    </form>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);


  // useEffect(() => {
  //   const storedTodos = localStorage.getItem('App');
  //   if (storedTodos) {
  //     setTodos(JSON.parse(storedTodos))
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("App", JSON.stringify(todos))
  // }, [todos])


  function addTodo(newTodo) {
    setTodos([
      ...todos,
      {
        id: todos.length,
        text: newTodo,
        completed: false,
        date: new Date().toISOString(),
      }
    ])
  }

  function toggleTodo(index) {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function deleteAll(index) {
    setTodos(todos.filter((i) => i === index));
    // setTodos([]);
    // setIsCheckAll(false);
  }

  function handleCheckedTask() {
    setTodos(todos.filter((todo) => !todo.completed));
    setIsCheckAll(false);
  }

  function toggleAllTodos() {
    const newTodos = todos.map((todo) => ({ ...todo, completed: !isCheckAll }));
    setTodos(newTodos);
    setIsCheckAll(!isCheckAll);
  }

  return (
    <div className="app-container">
      <h1>My Todo App</h1>
      <hr />
      <Form onAddTodo={addTodo}></Form>

      <hr />
      <h2>Todos</h2>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        deleteAll={deleteAll}></TodoList>
      <hr />

      <div className="container-button">
        <button onClick={toggleAllTodos}>
          {isCheckAll ? "Uncheck all" : "Check all"}
        </button>
        <button onClick={() => handleCheckedTask()}>Delete checked todo</button>
        <button onClick={() => deleteAll()}>Delete all</button>
      </div>
      <hr />
      {/* <CalendarComponent todos={todos}/> */}
    </div>
  );
}
//git diff --no-renames
