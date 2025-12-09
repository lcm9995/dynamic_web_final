import "./BulletinBoardPage.css";
import axios from "axios";
import RecentTasksWidget from "../components/widgets/RecentTasksWidget";
import PriorityGroceryWidget from "../components/widgets/PriorityGroceryWidget";
import ContributionsWidget from "../components/widgets/ContributionsWidget";
import StickyNote from "../components/StickyNote";
import { useEffect, useState } from "react";
export default function BulletinBoardPage(props) {
  const { tasks, groceries, users } = props;
  const [notes, setNotes] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      setNotes(res.data);
    }).catch(() => {});
  }, []);

  function createNote() {
    const newNote = {
      text: "",
      x: 100,
      y: 100,
      color: "#FFF79A"
    };

    axios.post("http://localhost:3001/notes", newNote).then((res) => {
      setNotes((prev) => [...prev, res.data]); 
    });
  }

 

  function updateNote(updated) {
    axios
      .patch(`http://localhost:3001/notes/${updated.id}`, updated)
      .then((res) => {
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? res.data : n)));
      });
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:3001/notes/${id}`).then(() => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    });
  }
  return (
    <div className="bulletin-board">
      
      <div className="board-area">
        {notes.map((note) => (
          <StickyNote
            key={`${note.id}-${note.x}-${note.y}-${(note.text||'').slice(0,6)}`}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>

      <div className="bb-grid">
        <div className="bb-column">
          <RecentTasksWidget tasks={tasks} users={users} />
          <PriorityGroceryWidget groceries={groceries} users={users} />
        </div>
        <div className="bb-column">
          <ContributionsWidget
            tasks={tasks}
            groceries={groceries}
            users={users}
          />
        </div>
      </div>
      
      <button className="add-note-btn" onClick={createNote}>
        + Sticky Note
      </button>
    </div>
  );
}