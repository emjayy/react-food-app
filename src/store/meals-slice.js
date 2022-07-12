import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    items: [],
    isLoading: true

  },
  reducers: {
    loadMeals(state, action) {
      state.items = action.payload;
      state.isLoading = false;
    },
  },
});

export const mealsActions = mealsSlice.actions;

export default mealsSlice;