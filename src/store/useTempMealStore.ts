import create from 'zustand';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
}

interface Meal {
  mealType: string;
  totalCalories: number;
  items: FoodItem[];
}

interface tempMealState {
  meals: Meal[];
  addFoodToMeal: (mealType: string, food: FoodItem) => void;
  addNewMeal: (mealType: string) => void;
}

export const useTempMealStore = create<tempMealState>((set) => ({
  meals: [
    { mealType: 'Breakfast', totalCalories: 0, items: [] },
    { mealType: 'Lunch', totalCalories: 0, items: [] },
    { mealType: 'Dinner', totalCalories: 0, items: [] },
  ],
  addFoodToMeal: (consumerMealType, food) =>
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.mealType.toLowerCase() === consumerMealType.toLowerCase()
          ? {
              ...meal,
              items: [...meal.items, food],
              totalCalories: meal.totalCalories + food.calories,
            }
          : meal
      ),
    })),
  addNewMeal: (mealType) =>
    set((state) => ({
      meals: [
        ...state.meals,
        { mealType, totalCalories: 0, items: [] },
      ],
    })),
}));
