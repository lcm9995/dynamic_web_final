import "./AddGroceryForm.css";
import { useState } from "react";

export default function AddGroceryForm(props) {
  const { onSubmit, onCancel } = props;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      priority,
      note: note.trim()
    });

    setTitle("");
    setPriority("Medium");
    setNote("");
  }

  return (
    <form className="add-grocery-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Item</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Paper towels"
        />
      </div>

      <div className="form-row">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="form-row">
        <label>Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Brand, size, why we need it..."
          rows={2}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save Item</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
