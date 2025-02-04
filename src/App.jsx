import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

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
    

    useEffect(() => {
      const storedTodos = localStorage.getItem('App');
      if (storedTodos){
        setTodos(JSON.parse(storedTodos))
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('App', JSON.stringify(todos));
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
  
    function handleCheckedTask() {
      setTodos(todos.filter((todo) => !todo.completed));
    }
  
    function toggleAllTodos() {
      const newTodos = todos.map((todo) => ({ ...todo, completed: !isCheckAll }));
      setTodos(newTodos);
      setIsCheckAll(!isCheckAll);
    }

    const keyDown = (event) => {
      if (event.key === 'Enter'){
        addTodo(event.target.value);
      }
    }

    // const addTodo = (task) => {
    // //trim supp les espaces blanc
    //   if (task.trim() !== "") {
    //     // setTodos([...todos, {text: newTodo, completed: false}]);
    //     setTodos([...todos, {id: todos.length, text: task, completed: false}]);
    //     setNewTodo('');
    //   }
    // };

    // const toggleTodo = (index) => {
    //   //todos.map() parcours toutes les tâches
    //   const updatedTodos = todos.map((todo, i) =>
    //   // i === index ? vérifie si l'index correspond
    //   i === index ? {...todo, completed: !todo.completed} : todo);
    //   setTodos(updatedTodos);
    // }

    // const deleteTodo = (index) => {
    //   const updatedTodos = [...todos];
    //   updatedTodos.splice(index, 1);
    //   setTodos(updatedTodos);
    // }
  // const deleteTodo = (index) => {
  //   const newTodos = todos.filter((_, i) => i !== index);
  //   setTodos(newTodos);
  // }

  // const handleCheckedTask = () => {
  //   const updatedTodos = todos.filter(todo => !todo.completed);
  //   setTodos(updatedTodos)
  //   ///todos((preTask) => preTask.filter((todos) => todos.done === false));
  // }

  // const toggleAllTodos = () => {
  //   const newTodos = todos.map(todo => ({...todo, completed: !isCheckAll}));
  //   setTodos(newTodos);
  //   setIsCheckAll(!isCheckAll);
  // };


  return(
      <div className="app-container">
        <h1>My Todo App</h1>
        <hr/>
        <Form onAddTodo={addTodo}></Form>
        <div class="container-button">
          <button onClick={toggleAllTodos}>
            {isCheckAll ? "Uncheck all": "Check all"}
          </button>

          <button onClick={() => handleCheckedTask()}>Delete checked todo</button>
        </div>
        <hr/>
        <h2>Todos</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}></TodoList>
        <hr/>

      </div>
    );
}
//export default App;