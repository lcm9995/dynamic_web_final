import "./TaskItem.css";

export default function TaskItem(props) {
const { task, creator, completer, onToggleComplete, onDelete } = props;

  const colorUser = completer || creator;

  return (
    <div className="task-row">

      <div className="col status-col">
        <input
          type="checkbox"
          checked={task.complete}
          onChange={(e) => onToggleComplete(e.target.checked)}
          style={colorUser?.color ? { accentColor: colorUser.color } : null}
        />
      </div>

      <div className="col title-col">{task.title}</div>

      <div className="col creator-col">{creator?.name || ""}</div>

      <div className="col completer-col">{completer?.name || ""}</div>

      <div className="col recurring-col">
        {task.recurring ? task.frequency : ""}
      </div>

      <div className="col delete-col">
        <button className="delete-btn" onClick={onDelete}>✕</button>
      </div>

    </div>
  );
}
