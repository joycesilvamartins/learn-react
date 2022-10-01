import React, {useState, useRef, useEffect} from "react"; //react hooks
import TodoList from "./TodoList"
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos' //storage in the browser

function App() {
  
  const [todos, setTodos] = useState([]) //monitoring the changs
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //parse from LOCAL_STORAGE_KEY 
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>{ //monitoring the changes and save in the local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos]) 

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos =>{
      return[...prevTodos, {id: uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value=null
  }

  function handleClearTodo() {
    const newTodos = [...todos]
    const todoRemaining = newTodos.filter(todo => !todo.complete)
    setTodos(todoRemaining)
  }

  function handleKeyPress(e) {
    if(e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <input onKeyDown={handleKeyPress} ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    </>
  );
}

export default App;
