import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

export default function StickyNote(props) {
  const { note, onUpdate, onDelete } = props;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const nodeRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  function handleSave() {
    onUpdate({ ...note, text });
    setEditing(false);
  }

  function handleDragStop(e, data) {
    onUpdate({ ...note, x: data.x, y: data.y });
  }

  const swatches = ["#FFF79A", "#c6e4ff", "#ffb6c1"];

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={{ x: note.x || 0, y: note.y || 0 }} onStop={handleDragStop} handle=".sticky-header">
      <div
        className="sticky-note"
        ref={nodeRef}
        style={{ backgroundColor: note.color }}
        onClick={(e) => {
          if (editing) return;
          if (
            //check where clicked
            e.target.closest('.sticky-header') ||
            e.target.closest('.note-delete') ||
            e.target.closest('.note-save-btn') ||
            e.target.closest('.note-textarea')
          ) {
            return;
          }
          e.stopPropagation();
          setEditing(true);
        }}
      >
        <div className="sticky-header" />
        <button className="note-delete" onClick={() => onDelete(note.id)}>
          ✕
        </button>

        {editing ? (
          <>
            <textarea
              ref={textareaRef}
              className="note-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="note-palette">
              {swatches.map((c) => (
                <button
                  key={c}
                  className="note-palette-swatch"
                  style={{ background: c }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate({ ...note, color: c });
                  }}
                  aria-label={`Choose ${c}`}
                />
              ))}
            </div>
            <button className="note-save-btn" onClick={handleSave}>
              ✔
            </button>
          </>
        ) : (
          <div className="note-text">
            {note.text}
          </div>
        )}
      </div>
    </Draggable>
  );
}
