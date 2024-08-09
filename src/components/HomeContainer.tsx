"use client";
import React from 'react';
import MealCard from './MealCard';
import Footer from './Footer';
import "../css/main.css";
import Header from './Header';
import CalorieChart from './CalorieChart';

const Home = ({ meals }) => {
    return (
        <>
            <Header />
            <CalorieChart meals={meals} />
            <div className="main">
                {meals?.map((meal, index) => (
                    <MealCard
                        key={index}
                        mealType={meal.mealType}
                        totalCalories={meal.totalCalories}
                        items={meal.items}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
