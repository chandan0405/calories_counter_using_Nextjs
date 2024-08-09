import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import foodReducer from "./slice/foodSlice";
import mealReducer from "./slice/mealSlice";
import tempMealReducer from "./slice/tempMealSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    food: foodReducer,
    meals: mealReducer,
    tempMeal: tempMealReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check middleware to prevent errors with non-serializable state
    }),
});

// Define TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
