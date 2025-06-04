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
                    />
                    <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                        {todo.text}
                    </span>

                    {todo.date && (
                        <span style={{ marginLeft: "1rem", color: "#888"}}>
                            ({new Date(todo.date).toLocaleDateString()})
                        </span>
                    )}

                    {todo.completed && (
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;