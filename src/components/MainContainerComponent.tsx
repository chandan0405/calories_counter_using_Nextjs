"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeContainer from './HomeContainer';
import Footer from './Footer';
import AddMealPopup from './AddMealPopup';
import { RootState } from '../redux/store';
import "../css/main.css";

interface Meal {
  mealType: string;
  items: Array<{ name: string; calories: number }>;
  totalCalories: number;
}

const MainContainerComponent: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { selectedDate } = useSelector((state: RootState) => state.food);
  const defaultMeals = useSelector((state: RootState) => state.meals);
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
