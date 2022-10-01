import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
  return (
   todos.map(entry =>{ //iterates over the todos
    return <Todo key={entry.id} todo={entry} toggleTodo={toggleTodo} /> 
   })
  )
}
