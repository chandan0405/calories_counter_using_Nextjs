
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    mealType: 'Breakfast',
    totalCalories: 0,
    items: [],
  },
  {
    mealType: 'Lunch',
    totalCalories: 0,
    items: [],
  },
  {
    mealType: 'Dinner',
    totalCalories: 0,
    items: [],
  },
];

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addFoodToMeal: (state, action) => {
      const { consumerMealType, food } = action.payload;
      return state.map(meal => {
        if (meal.mealType.toLowerCase() === consumerMealType.toLowerCase()) {
          return {
            ...meal,
            items: [...meal.items, food],
            totalCalories: meal.totalCalories + food.calories,
          };
        }
        return meal;
      });
    },
    addNewMeal: (state, action) => {
      const newmeal = {
        mealType: action.payload,
        totalCalories: 0,
        items: [],
      }
      return [...state, newmeal]

    }
  },
});

export const { addFoodToMeal, addNewMeal } = mealSlice.actions;
export default mealSlice.reducer;


