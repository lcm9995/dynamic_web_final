import { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";
import Notes from "./components/Notes";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchNotes();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks");
    setTasks(response.data);
  };

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:3001/notes");
    setNotes(response.data);
  };

  const addTask = async (title) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      title: title,
      completed: false,
    });

    setTasks([...tasks, response.data]);
  };

  const toggleTask = async (id, completed) => {
    const response = await axios.put(
      `http://localhost:3001/tasks/${id}`,
      { completed: !completed }
    );

    const updated = tasks.map(task =>
      task.id === id ? { ...task, ...response.data } : task
    );

    setTasks(updated);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNote = async (message) => {
    const response = await axios.post("http://localhost:3001/notes", {
      message: message,
    });

    setNotes([...notes, response.data]);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3001/notes/${id}`);
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Roommate Board</h1>

      <Tasks 
        tasks={tasks}
        addTask={addTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <Notes
        notes={notes}
        addNote={addNote}
        deleteNote={deleteNote}
      />
    </div>
  );
};

export default App;
