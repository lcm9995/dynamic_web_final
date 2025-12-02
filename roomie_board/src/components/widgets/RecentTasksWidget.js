import Widget from "./Widget";
import "./RecentTasksWidget.css";

export default function RecentTasksWidget({ tasks, users }) {
  const visible = tasks.filter((t) => t.isCurrent !== false).slice().sort((a, b) => b.id - a.id).slice(0, 5);
  function findUser(id) {
    return users.find((u) => u.id === id) || null;
  }
  return (
    <Widget title="Recently Added Tasks" className="rt-widget">
      {visible.length === 0 ? (
        <p className="rt-empty">No tasks yet.</p>
      ) : (
        <ul className="rt-list">
          {visible.map((task) => {
            const creator = findUser(task.creatorId);
            const completer = findUser(task.completedById);

            return (
              <li key={task.id} className="rt-item">
                <div className="rt-main">
                  <span
                    className={
                      "rt-status-dot " + (task.complete ? "rt-done" : "rt-open")
                    }
                  />
                  <span
                    className={
                      "rt-title " + (task.complete ? "rt-title-done" : "")
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <div className="rt-meta">
                  {creator && <span>by {creator.name}</span>}
                  {task.recurring && (
                    <span className="rt-tag">
                      Recurring
                      {task.frequency && task.frequency !== "none"
                        ? ` • ${task.frequency}`
                        : ""}
                    </span>
                  )}
                  {completer && (
                    <span className="rt-completed">
                      ✓ done by {completer.name}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Widget>
  );
}