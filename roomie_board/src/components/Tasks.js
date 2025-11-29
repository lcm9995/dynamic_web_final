import { useState } from "react";
const Tasks = ({ tasks, addTask, toggleTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="section">
      <h2 className="h4 mb-3">Tasks</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      </div>

      <div className="card p-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="d-flex justify-content-between mb-2"
          >
            <span
              onClick={() => toggleTask(task.id, task.completed)}
              style={{ cursor: "pointer" }}
              className={
                task.completed
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {task.title}
            </span>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tasks;