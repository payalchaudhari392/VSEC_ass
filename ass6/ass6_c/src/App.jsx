
import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((item, i) => i !== index));
  }

  return (
    <div className="app">
      <h1>Assignment 6(C)</h1>
      <h2>To-Do List App</h2>

      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <h3>My Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks added yet!</p>
      ) : (
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
