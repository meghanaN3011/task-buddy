import { useState } from "react";
import AddTask from "./Add";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 

  const addTask = (taskName) => {
    if (editingTask) {
     
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, name: taskName } : task
        )
      );
      setEditingTask(null); 
    } else {
    
      const newTask = { id: Date.now(), name: taskName, status: "todo" };
      setTasks([...tasks, newTask]);
    }
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task); 
  };

  const renderTasks = (status) =>
    tasks.filter((task) => task.status === status).length === 0 ? (
      <p className="empty-msg">No tasks yet</p>
    ) : (
      tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div key={task.id} className="task-card">
            <span>{task.name}</span>
            <div className="btn-group">
              <button onClick={() => editTask(task)} className="btn grey">
                Edit
              </button>
              {status !== "todo" && (
                <button onClick={() => moveTask(task.id, "todo")} className="btn blue">
                  To-Do
                </button>
              )}
              {status !== "ongoing" && (
                <button
                  onClick={() => moveTask(task.id, "ongoing")}
                  className="btn orange"
                >
                  Ongoing
                </button>
              )}
              {status !== "completed" && (
                <button
                  onClick={() => moveTask(task.id, "completed")}
                  className="btn green"
                >
                  Done
                </button>
              )}
              <button onClick={() => deleteTask(task.id)} className="btn red">
                ✖
              </button>
            </div>
          </div>
        ))
    );

  return (
    <div className="app-container">
      <h1 className="title">Welcome to Task Buddy</h1>
      <AddTask addTask={addTask} editingTask={editingTask} />
      <div className="task-sections">
        <div className="task-box">
          <h2 className="section-title">📋 To-Do Tasks</h2>
          {renderTasks("todo")}
        </div>
        <div className="task-box">
          <h2 className="section-title">⏳ Ongoing Tasks</h2>
          {renderTasks("ongoing")}
        </div>
        <div className="task-box">
          <h2 className="section-title">✅ Completed Tasks</h2>
          {renderTasks("completed")}
        </div>
      </div>
    </div>
  );
}

export default App;
