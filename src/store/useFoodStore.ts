import create from 'zustand';

interface FoodState {
  selectedDate: Date;
  selectedFoods: string;
  setSelectedDate: (date: Date) => void;
  setSelectedFoods: (food: string) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  selectedDate: new Date(),
  selectedFoods: "Breakfast",
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  setSelectedFoods: (food: string) => set({ selectedFoods: food }),
}));
