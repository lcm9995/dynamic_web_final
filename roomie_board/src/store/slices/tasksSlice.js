import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    searchTerm: "",
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addTask(state, action) {
      // action.payload = { title: "Take out trash" }
      state.data.push({
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      });
    },
    toggleTask(state, action) {
      const id = action.payload;
      const task = state.data.find((t) => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask(state, action) {
      const id = action.payload;
      state.data = state.data.filter((task) => task.id !== id);
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleTask,
  changeSearchTerm,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
