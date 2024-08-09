"use client";
import React from 'react';
import "../../css/mealToggle.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFoods } from '../../redux/slice/foodSlice';

const MealToggle = () => {
    const dispatch = useDispatch();
    const selectedFoods = useSelector((state) => state.food.selectedFoods);
    const defaultMeals = ['breakfast', 'lunch', 'dinner'];

    const handleMealClick = (meal) => {
        dispatch(setSelectedFoods(meal));
    };

    const getMealOrder = (selectedMeal) => {
        if (defaultMeals.includes(selectedMeal.toLowerCase())) {
            // Selected meal is one of the default meals
            const selectedIndex = defaultMeals.indexOf(selectedMeal.toLowerCase());
            const firstIndex = (selectedIndex + defaultMeals.length - 1) % defaultMeals.length;
            const lastIndex = (selectedIndex + 1) % defaultMeals.length;

            return [defaultMeals[firstIndex], defaultMeals[selectedIndex], defaultMeals[lastIndex]];
        } else {
            // Selected meal is not one of the default meals
            return ['breakfast', selectedMeal?.toLowerCase(), 'dinner'];
        }
    };

    const mealOrder = getMealOrder(selectedFoods);

    return (
        <div className='meal_container'>
            {mealOrder?.map((meal, index) => (
                <div
                    key={index}
                    className={`meal_section ${selectedFoods && selectedFoods.toLowerCase() === meal ? 'active' : ''}`}
                    onClick={() => handleMealClick(meal)}
                >
                    <div className="meal_title">{meal.charAt(0).toUpperCase() + meal?.slice(1)}</div>
                </div>
            ))}
            <span className='divider'></span>
        </div>
    );
};

export default MealToggle;
