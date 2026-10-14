
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/tasks";

export default function App() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  async function load() {
    const res = await fetch(API);
    setTasks(await res.json());
  }

  useEffect(() => {
    if (login) load();
  }, [login]);

  async function save(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(editId ? `${API}/${editId}` : API, {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status, priority: "Medium" })
    });

    setTitle("");
    setStatus("Pending");
    setEditId(null);
    load();
  }

  function edit(task) {
    setTitle(task.title);
    setStatus(task.status);
    setEditId(task._id);
  }

  async function remove(id) {
    if (confirm("Delete this task?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      load();
    }
  }

  if (!login) return (
    <div className="login">
      <form onSubmit={e => {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "123456")
          setLogin(true);
        else alert("Invalid login details");
      }}>
        <h1>Task Manager</h1>
        <p>Login to manage your daily tasks</p>
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} required />
        <button>Login</button>
        <small>Demo: admin@gmail.com / 123456</small>
      </form>
    </div>
  );

  return (
    <main>
      <header>
        <h1>My Task Manager</h1>
        <button onClick={() => setLogin(false)}>Logout</button>
      </header>

      <form onSubmit={save}>
        <h2>{editId ? "Edit Task" : "Add Daily Task"}</h2>
        <input placeholder="Enter task name" value={title}
          onChange={e => setTitle(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button>{editId ? "Update Task" : "Add Task"}</button>
      </form>

      <section>
        <h2>My Tasks ({tasks.length})</h2>
        {tasks.map(task => (
          <article key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
            </div>
            <button onClick={() => edit(task)}>Edit</button>
            <button onClick={() => remove(task._id)}>Delete</button>
          </article>
        ))}
      </section>
    </main>
  );
}
