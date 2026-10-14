
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/tasks";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // Login validation (demo only)
  function handleLogin(e) {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {
      setLoggedIn(true);
      setLoginMessage("");
    } else {
      setLoginMessage("Invalid email or password.");
    }
  }

  // Get all tasks
  async function loadTasks() {
    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Could not load tasks.");
      }

      setTasks(data);
    } catch (error) {
      setMessage("Cannot connect to backend.");
    }
  }

  useEffect(() => {
    if (loggedIn) {
      loadTasks();
    }
  }, [loggedIn]);

  // Add or update task
  async function saveTask(e) {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter a task name.");
      return;
    }

    const taskData = { title, priority, status };

    try {
      const response = await fetch(
        editId ? `${API}/${editId}` : API,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(taskData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Task operation failed.");
      }

      setTitle("");
      setPriority("Medium");
      setStatus("Pending");
      setEditId(null);
      setMessage(editId ? "Task updated successfully!" : "Task added successfully!");

      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  // Edit task
  function editTask(task) {
    setTitle(task.title);
    setPriority(task.priority);
    setStatus(task.status);
    setEditId(task._id);
    setMessage("");
  }

  // Delete task
  async function deleteTask(id) {
    if (!window.confirm("Do you want to delete this task?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete task.");
      }

      setMessage("Task deleted successfully!");
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  // Cancel editing
  function cancelEdit() {
    setTitle("");
    setPriority("Medium");
    setStatus("Pending");
    setEditId(null);
    setMessage("");
  }

  // Logout
  function handleLogout() {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setTitle("");
    setMessage("");
    setLoginMessage("");
    setEditId(null);
    setTasks([]);
  }

  // Show login page first
  if (!loggedIn) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">✓</div>

          <h1>Task Manager</h1>
          <p className="subtitle">Login to manage your tasks</p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginMessage && (
            <p className="error-message">{loginMessage}</p>
          )}

          <button className="login-button" type="submit">
            Login
          </button>

          <p className="demo-note">
            Demo: admin@gmail.com / 123456
          </p>
        </form>
      </div>
    );
  }

  // Show dashboard after login
  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>Task Management System</h1>
          <p>Organize your work. Achieve your goals.</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="form-card">
        <h2>{editId ? "Update Task" : "Add New Task"}</h2>

        <form onSubmit={saveTask}>
          <label>Task Name</label>
          <input
            type="text"
            placeholder="Enter your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="fields">
            <div>
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="actions">
            <button type="submit">
              {editId ? "Update Task" : "Add Task"}
            </button>

            {editId && (
              <button
                type="button"
                className="cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="tasks-section">
        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-card" key={task._id}>
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>Priority: {task.priority}</p>
                  <p>Status: {task.status}</p>
                </div>

                <div className="task-actions">
                  <button onClick={() => editTask(task)}>
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
