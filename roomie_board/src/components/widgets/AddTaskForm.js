import "./AddTaskForm.css";
import { useState } from "react";

export default function AddTaskForm(props) {
  const { onSubmit, onCancel } = props;

  const [title, setTitle] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [daysText, setDaysText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    const daysOfWeek =
      frequency === "daysOfWeek" && daysText.trim()
        ? daysText.split(",").map((d) => d.trim())
        : null;

    onSubmit({
      title: title.trim(),
      recurring,
      frequency: recurring ? frequency || null : null,
      daysOfWeek: recurring && frequency === "daysOfWeek" ? daysOfWeek : null
    });

    setTitle("");
    setRecurring(false);
    setFrequency("");
    setDaysText("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Take out trash"
        />
      </div>

      <div className="form-row form-row-inline">
        <label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          Recurring
        </label>

        {recurring && (
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="daysOfWeek">Specific days</option>
          </select>
        )}
      </div>

      {recurring && frequency === "daysOfWeek" && (
        <div className="form-row">
          <label>Days of week</label>
          <input
            type="text"
            value={daysText}
            onChange={(e) => setDaysText(e.target.value)}
            placeholder="e.g. Mon, Wed, Fri"
          />
        </div>
      )}

      <div className="form-actions">
        <button type="submit">Save Task</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
