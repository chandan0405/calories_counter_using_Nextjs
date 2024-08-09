
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: new Date(),
  selectedFoods: "Breakfast",
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedFoods: (state, action) => {
      state.selectedFoods = action.payload;
    },
  },
});

export const { setSelectedDate, setSelectedFoods } = foodSlice.actions;

export default foodSlice.reducer;
