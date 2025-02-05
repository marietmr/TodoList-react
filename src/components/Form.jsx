// import React from "react";

// function Form({onAddTodo}){
// const [task, setTask] = useState("");

// function handleSubmit(event){
//     event.preventDefault(); 

//     if(task.trim() === "") return;

//     onAddTodo(task);
//     setTask("");
// }

// return (
//     <form onSubmit={handleSubmit}>
//     <input
//         type="text"
//         name="todo"
//         placeholder="Write a new todo"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//     />
//     <button type="submit">Add todo</button>
//     </form>
// )
// }
// export default Form;