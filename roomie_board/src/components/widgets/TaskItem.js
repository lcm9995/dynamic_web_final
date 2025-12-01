import "./TaskItem.css";

export default function TaskItem(props) {
const { task, creator, completer, onToggleComplete, onDelete } = props;

  const colorUser = completer || creator;

  return (
    <div className={`task-item ${task.complete ? "task-complete" : ""}`}>
      <div className="task-main-row">
        <label className="task-main">
          <input
            type="checkbox"
            checked={task.complete}
            onChange={(e) => onToggleComplete(e.target.checked)}
            style={colorUser?.color ? { accentColor: colorUser.color } : null}
          />
          <span>{task.title}</span>
        </label>

        <button className="task-delete-btn" onClick={onDelete}>
          ✕
        </button>
      </div>

      <div className="task-meta">
        {creator && <span>Created by {creator.name}</span>}
        {completer && <span>Done by {completer.name}</span>}
        {task.recurring && <span>Recurring</span>}
        {task.recurring && task.frequency && (
          <span>
            {task.frequency === "daysOfWeek"
              ? `On: ${(task.daysOfWeek || []).join(", ")}`
              : task.frequency}
          </span>
        )}
      </div>
    </div>
  );
}
