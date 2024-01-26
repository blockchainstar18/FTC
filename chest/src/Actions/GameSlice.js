import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chest: null,
  size: null,
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectchest: (state, action) => {
      state.chest = action.payload;
    },
    selectsize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { selectchest, selectsize } = GameSlice.actions;

export default GameSlice.reducer;
