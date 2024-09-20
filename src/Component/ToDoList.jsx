import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Todolist() {
    let [todos, setTodos] = useState([{ task: "Dummy", id: uuidv4(), isDone: false }]);
    let [newtodos, setNewtodos] = useState("");
    let [editingId, setEditingId] = useState(null);
    let [editingText, setEditingText] = useState("");

    function handleNewTask() {
        if (newtodos.trim()) {
            setTodos([...todos, { task: newtodos, id: uuidv4(), isDone: false }]);
            setNewtodos("");
        }
    }

    function handleTodovalue(event) {
        setNewtodos(event.target.value);
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    function handleDonetask(id) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    function handleDoneAllTasks() {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({ ...todo, isDone: true }))
        );
    }

    function handleCheck(id) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    function handleEdit(id, task) {
        setEditingId(id);
        setEditingText(task);
    }

    function handleEditChange(event) {
        setEditingText(event.target.value);
    }

    function handleEditSubmit(id) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: editingText } : todo
            )
        );
        setEditingId(null);
        setEditingText("");
    }

    return (
        <>
            <div className="flex flex-wrap justify-center mt-12 px-4 md:px-8 lg:px-16">
                <input
                    className="w-full md:w-[50%] lg:w-[40%] mx-2 md:mx-4 lg:mx-8 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-teal-500 focus:ring-teal-500 focus:ring-1"
                    type="text"
                    placeholder="Add A Task"
                    value={newtodos}
                    onChange={handleTodovalue}
                />
                <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2 text-center" onClick={handleNewTask}><i className="fa-solid fa-plus"></i></button>
            </div>

            <div className="flex justify-center my-7 px-4 md:px-8 lg:px-16">
                <ul className="w-full md:w-[75%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                    {todos.map((todo) => (
                        <li className="flex flex-wrap justify-between items-center m-4" key={todo.id}>
                            <div className="flex items-center w-full md:w-auto">
                                <input className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    type="checkbox"
                                    checked={todo.isDone}
                                    onChange={() => handleCheck(todo.id)}
                                />
                                {editingId === todo.id ? (
                                    <input
                                        className="ml-4 text-xl font-medium w-full md:w-auto px-4 md:px-8 border border-gray-300 rounded-md"
                                        type="text"
                                        value={editingText}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    <span className={`ml-4 text-xl font-medium w-full md:w-auto px-4 md:px-8 ${todo.isDone ? 'line-through' : ''}`}>
                                        {todo.task}
                                    </span>
                                )}
                            </div>

                            <div className="flex space-x-2 mt-2 md:mt-0">
                                {editingId === todo.id ? (
                                    <button onClick={() => handleEditSubmit(todo.id)} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"><i className="fa-solid fa-check"></i></button>
                                ) : (
                                    <button onClick={() => handleEdit(todo.id, todo.task)} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"><i className="fa-solid fa-pen"></i></button>
                                )}
                                <button onClick={() => handleDelete(todo.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center"><i className="fa-solid fa-trash"></i></button>
                                <button onClick={() => handleDonetask(todo.id)} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"><i className="fa-solid fa-check"></i></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center m-3">
                <button onClick={handleDoneAllTasks} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2 text-center">Done All Tasks</button>
            </div>
        </>
    );
}

export default Todolist;
