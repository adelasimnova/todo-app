import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToDoList } from './to-do-list/ToDoList';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>,
)
