"use client";
import React from 'react';
import '../css/MealCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFoods } from '../redux/slice/foodSlice';

const MealCard = ({ mealType, totalCalories, items }) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.food.selectedDate);

    const handleCardClick = () => {
        dispatch(setSelectedFoods(mealType));
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        // navigate(`/search/${formattedDate}`);
    };

    return (
        <div className="meal-card" onClick={handleCardClick}>
            <h2>{mealType}</h2>
            <p className="total-calories">{totalCalories} calories</p>
            <ul>
                {items.map((item,index) => (
                    <li key={index} className="d-flex justify-content-between">
                        <span>{item.name}</span>
                        <span>{item.calories} cal</span>
                    </li>
                ))
                }
            </ul>
        </div>
    );
};

export default MealCard;

