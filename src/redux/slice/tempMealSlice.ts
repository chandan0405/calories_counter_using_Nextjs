
import { createSlice, nanoid } from '@reduxjs/toolkit';

const tempMealSlice = createSlice({
  name: 'tempMeal',
  initialState: {
    tempMealData: []
  },
  reducers: {
    addFoodItem: (state, action) => {
      const existingIndex = state.tempMealData.findIndex(item => item.id === action.payload.id);
      if (existingIndex !== -1) {
        state.tempMealData[existingIndex] = action.payload;
      } else {
        const newItem = {
        ...action.payload,
        id: nanoid(),
      };
      state.tempMealData.push(newItem);
      }
    },
    updateFoodItem: (state, action) => {
      const index = state.tempMealData.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.tempMealData[index] = action.payload;
      }
    },
    removeFoodItem: (state, action) => {
      state.tempMealData = state.tempMealData.filter(item => item.id !== action.payload);
    },
    resetTempMeals: (state) => {
      state.tempMealData = [];
    }
  }
});

export const { addFoodItem, updateFoodItem, removeFoodItem, resetTempMeals } = tempMealSlice.actions;
export default tempMealSlice.reducer;
