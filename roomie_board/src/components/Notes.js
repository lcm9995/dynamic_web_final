import { useState } from "react";
const Notes = ({ notes, addNote, deleteNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = () => {
    if (!newNote.trim()) return;
    addNote(newNote);
    setNewNote("");
  };

  return (
    <div className="section">
      <h2 className="h4 mb-3">Notes</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      </div>

      <div className="card p-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="d-flex justify-content-between mb-2"
          >
            <span>{note.message}</span>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;