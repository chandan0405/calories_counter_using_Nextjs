import { create } from "zustand";
import { nanoid } from 'nanoid';

export interface FoodDataItem {
  id: string;
  name: string;
  calories: number;
  weight: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
  quantity: number;
}

interface mealItem {
  mealData: FoodDataItem[];
  addFoodItem: (food: Omit<FoodDataItem, 'id'>) => void;
  updateFoodItem: (food: FoodDataItem) => void;
  removeFoodItem: (id: string) => void;
  resetTempMeals: () => void;
}

export const useMealStore = create<mealItem>((set) => ({
  mealData: [] as FoodDataItem[],
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
