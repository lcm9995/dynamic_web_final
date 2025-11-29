import { createSlice, nanoid } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    data: [],
  },
  reducers: {
    addNote(state, action) {
      // action.payload = { message: "Buy milk" }
      state.data.push({
        id: nanoid(),
        message: action.payload.message,
      });
    },
    removeNote(state, action) {
      const id = action.payload;
      state.data = state.data.filter((note) => note.id !== id);
    },
  },
});

export const { addNote, removeNote } = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
