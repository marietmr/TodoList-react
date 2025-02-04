import React from "react";

const TodoList = ({ todos, toggleTodo, deleteTodo}) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={todo.id} style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(index)}
                    ></input>
                    {todo.text}
                    {todo.completed && (
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;