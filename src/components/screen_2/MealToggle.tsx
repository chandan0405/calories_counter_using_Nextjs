"use client";
import React from 'react';
import "../../css/mealToggle.css";
import { useFoodStore } from '@/store/useFoodStore';

const MealToggle: React.FC = () => {
    const selectedFoods = useFoodStore((state)=>state.selectedFoods)
    const setSelectedFoods= useFoodStore((state)=>state.setSelectedFoods);
    const defaultMeals: string[] = ['breakfast', 'lunch', 'dinner'];

    const handleMealClick = (meal: string) => {
        setSelectedFoods(meal)
    };

    const getMealOrder = (selectedMeal: string): string[] => {
        if (defaultMeals.includes(selectedMeal.toLowerCase())) {
            const selectedIndex = defaultMeals.indexOf(selectedMeal.toLowerCase());
            const firstIndex = (selectedIndex + defaultMeals.length - 1) % defaultMeals.length;
            const lastIndex = (selectedIndex + 1) % defaultMeals.length;

            return [defaultMeals[firstIndex], defaultMeals[selectedIndex], defaultMeals[lastIndex]];
        } else {
            return ['breakfast', selectedMeal?.toLowerCase(), 'dinner'];
        }
    };

    const mealOrder = getMealOrder(selectedFoods);

    return (
        <div className="meal_container">
            {mealOrder.map((meal, index) => (
                <div
                    key={index}
                    className={`meal_section ${selectedFoods && selectedFoods.toLowerCase() === meal ? 'active' : ''}`}
                    onClick={() => handleMealClick(meal)}
                >
                    <div className="meal_title">{meal.charAt(0).toUpperCase() + meal.slice(1)}</div>
                </div>
            ))}
            <span className="divider"></span>
        </div>
    );
};

export default MealToggle;
