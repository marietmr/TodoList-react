import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
// import Calendar from 'react-calendar';
import './Calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const localizer = momentLocalizer(moment);

export default function App() {
    const [todos, setTodos] = useState([]);
    // const [newTodo, setNewTodo] = useState('');
    const [isCheckAll, setIsCheckAll] = useState(false);
    // const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

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

    // function disabledDates(data) {
    //   return data.view === 'month' && data.date.getDay() === 0;
    // }

    const handleSelectSlot = ({start, end}) => {
      const title = window.prompt("New Event name");
      if (title){
        setEvents([...events, {start, end, title}])
      }
    };


    // const keyDown = (event) => {
    //   if (event.key === 'Enter'){
    //     addTodo(event.target.value);
    //   }
    // }

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
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500}}
            selectable
            onSelectSlot={handleSelectSlot}
          ></Calendar>
      </div>
    );
}
//git diff --no-renames