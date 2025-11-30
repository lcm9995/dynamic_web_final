import "./TaskItem.css";

export default function TaskItem(props) {
  const { task, onToggleComplete } = props;

  return (
    <div className={`task-item ${task.complete ? "task-complete" : ""}`}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={task.complete}
          onChange={(e) => onToggleComplete(e.target.checked)}
        />
        <span className="task-title">{task.title}</span>
      </label>

      {task.recurring && (
        <div className="task-meta">
          <span className="task-tag">Recurring</span>
          {task.frequency && (
            <span className="task-tag">
              {task.frequency === "daysOfWeek"
                ? `On: ${(task.daysOfWeek || []).join(", ")}`
                : task.frequency.charAt(0).toUpperCase() + task.frequency.slice(1)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
