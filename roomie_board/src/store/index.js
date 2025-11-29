import { configureStore } from "@reduxjs/toolkit";
import {
  tasksReducer,
  addTask,
  removeTask,
  toggleTask,
  changeSearchTerm,
} from "./slices/tasksSlice";
import {
  notesReducer,
  addNote,
  removeNote,
} from "./slices/notesSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notes: notesReducer,
  },
});

// Export store AND all actions (professor’s pattern)
export {
  store,
  addTask,
  removeTask,
  toggleTask,
  changeSearchTerm,
  addNote,
  removeNote,
};
