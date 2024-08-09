
"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeContainer from './HomeContainer';
import Footer from './Footer';
import AddMealPopup from './AddMealPopup';

const MainContainerComponent = () => {
    const [meals, setMeals] = useState([]);
    const { selectedDate } = useSelector((state) => state.food);
    const defaultMeals = useSelector((state) => state.meals);
    const [showAddMealPopup, setShowAddMealPopup] = useState(false);

    const fetchMeals = (date) => {
        const currentDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const storedMeals = JSON.parse(localStorage.getItem(currentDate));

        if (storedMeals) {
            const meals = Object.keys(storedMeals).map((mealType) => ({
                mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1),
                items: storedMeals[mealType],
                totalCalories: storedMeals[mealType].reduce((acc, item) => acc + (item.calories || 0), 0),
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
        <>
            <HomeContainer meals={meals} />
            <Footer handleShowPopup={handleShowPopup} />
            {
                showAddMealPopup &&
                (<AddMealPopup
                    show={handleShowPopup}
                    closePopup={closePopup}
                    referFood={referFood}
                />
                )
            }
        </>
    );
};

export default MainContainerComponent;
