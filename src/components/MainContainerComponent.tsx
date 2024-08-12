"use client";
import React, { useState, useEffect } from 'react';
import HomeContainer from './HomeContainer';
import Footer from './Footer';
import AddMealPopup from './AddMealPopup';
import "../css/main.css";
import { useFoodStore } from '@/store/useFoodStore';
import { useTempMealStore } from '@/store/useTempMealStore';

interface Meal {
  mealType: string;
  items: Array<{ name: string; calories: number }>;
  totalCalories: number;
}

const MainContainerComponent: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const  selectedDate  = useFoodStore((state) => state.selectedDate);
  const defaultMeals = useTempMealStore((state)=>state.meals);
  const [showAddMealPopup, setShowAddMealPopup] = useState<boolean>(false);

  const fetchMeals = (date: Date): Meal[] => {
    const currentDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const storedMeals = localStorage.getItem(currentDate);

    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals);
      const meals = Object.keys(parsedMeals).map((mealType) => ({
        mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1),
        items: parsedMeals[mealType],
        totalCalories: parsedMeals[mealType].reduce(
          (acc: number, item: { calories: number }) => acc + (item.calories || 0),
          0
        ),
      }));
      return meals;
    }

    return defaultMeals;
  };

  useEffect(() => {
    const meals = fetchMeals(selectedDate);
    setMeals(meals);
  }, [selectedDate, defaultMeals]);

  const handleShowPopup = () => {
    setShowAddMealPopup(true);
  };

  const closePopup = () => {
    setShowAddMealPopup(false);
  };

  const referFood = () => {
    const meals = fetchMeals(selectedDate);
    setMeals(meals);
  };

  return (
    <div className='header_footer_container'>
      <HomeContainer meals={meals} />
      <Footer handleShowPopup={handleShowPopup} />
      {showAddMealPopup && (
        <AddMealPopup show={handleShowPopup} closePopup={closePopup} referFood={referFood} />
      )}
    </div>
  );
};

export default MainContainerComponent;
