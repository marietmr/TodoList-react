import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// function pickDate() {
//   const [startDate, setStartDate] = useState(new Date());

//   return (
//     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}></DatePicker>
//   )
// }


function Form({onAddTodo}){
  const [task, setTask] = useState("");

  function handleSubmit(event){
    event.preventDefault(); 

    if(task.trim() === "") return;

    onAddTodo(task);
    setTask("");
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
      <button type="submit">Add todo</button>
    </form>
  )
}


export default function App() {
    const [todos, setTodos] = useState([]);
    // const [newTodo, setNewTodo] = useState('');
    const [isCheckAll, setIsCheckAll] = useState(false);
    // const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
      const storedTodos = localStorage.getItem('App');
      if (storedTodos){
        setTodos(JSON.parse(storedTodos))
      }
    }, []);

    // useEffect(() => {
    //   const savedTodos = JSON.parse(window.localStorage.getItem('App'));
    //   if(savedTodos){
    //     setTodos(savedTodos);
    //   }
    // }, []);

    useEffect(() => {
      window.localStorage.setItem('App', JSON.stringify(todos));
    }, [todos]);


    function addTodo(newTask) {
      setTodos([...todos, {id: todos.length, text: newTask, completed: false}])
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

    function deleteAll(index){
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


  return(
      <div className="app-container">
        <h1>My Todo App</h1>
        <hr/>
        <Form onAddTodo={addTodo}></Form>
        
        <hr/>
        <h2>Todos</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} deleteAll={deleteAll}></TodoList>
        <hr/>
          
          <div className="container-button">
            <button onClick={toggleAllTodos}>
            {isCheckAll ? "Uncheck all": "Check all"}
          </button>
            <button onClick={() => handleCheckedTask()}>Delete checked todo</button>
            <button onClick={() => deleteAll()}>Delete all</button>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
            </div>

      </div>
    );
}
//git diff --no-renames