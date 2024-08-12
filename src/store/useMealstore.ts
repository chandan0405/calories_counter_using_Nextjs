import { create } from "zustand";
import { nanoid } from 'nanoid';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
}

interface mealItem {
  mealData: FoodItem[];
  addFoodItem: (food: Omit<FoodItem, 'id'>) => void;
  updateFoodItem: (food: FoodItem) => void;
  removeFoodItem: (id: string) => void;
  resetTempMeals: () => void;
}

export const useMealStore = create<mealItem>((set) => ({
  mealData: [],
  addFoodItem: (food) =>
    set((state) => ({
      mealData: [
        ...state.mealData,
        { ...food, id: nanoid() },
      ],
    })),
  updateFoodItem: (food) =>
    set((state) => ({
      mealData: state.mealData.map((item) =>
        item.id === food.id ? food : item
      ),
    })),
  removeFoodItem: (id) =>
    set((state) => ({
      mealData: state.mealData.filter(
        (item) => item.id !== id
      ),
    })),
  resetTempMeals: () =>
    set(() => ({ mealData: [] })),
}));
