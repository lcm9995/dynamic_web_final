import "./StickyNote.css";
import Draggable from "react-draggable";

export default function StickyNote(props) {
  const { note, onDragStop } = props;

  return (
    <Draggable
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={(e, data) => onDragStop(note.id, data.x, data.y)}
    >
      <div className="sticky-note">
        <p>{note.text}</p>
      </div>
    </Draggable>
  );
}
