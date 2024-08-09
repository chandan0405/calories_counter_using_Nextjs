"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../../css/barChart.css";
import { useSelector } from 'react-redux';


const CaloriesBarChart = () => {
  const { selectedDate } = useSelector((state) => state.food);
  // const navigate = useNavigate();

  // Function to calculate total calories for a specific date
  const calculateTotalCaloriesForDate = (formattedDate) => {
    let totalCalories = 0;
    const dailyCalorieData = JSON.parse(localStorage.getItem(formattedDate));
    if (dailyCalorieData) {
      Object.values(dailyCalorieData).forEach((mealArray) => {
        totalCalories += mealArray.reduce((total, meal) => total + meal.calories, 0);
      });
    }

    return totalCalories;
  };
  const generateCalorieDataForLast7Days = () => {
    let calorieDataArray = [];
    const currentDate = new Date();

    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - dayOffset);

      // Format date for localStorage and display
      const formattedDate = date.toLocaleDateString("en-US", { day: '2-digit', month: '2-digit', year: 'numeric' });
      const displayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Calculate total calories for the day
      const totalCaloriesForDay = calculateTotalCaloriesForDate(formattedDate);

      // Push data into the array
      calorieDataArray.push({
        date: displayDate,
        calories: totalCaloriesForDay
      });
    }

    return calorieDataArray;
  };

  const calorieDataForChart = generateCalorieDataForLast7Days(); // Store calorie data for rendering

  useEffect(() => {
    // Fetch calorie data whenever the selected date changes
    generateCalorieDataForLast7Days();
  }, [selectedDate]);

  const navigateToHome = () => {
    // navigate('/');
  };

  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">Calories Trend for the Last 7 Days</h2>
        <BarChart
          width={380}
          height={300}
          data={calorieDataForChart}
          margin={{
            top: 40,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calories" fill="#8884d8" />
        </BarChart>
      </div>
      <button className='save-btn' onClick={navigateToHome}>Go to Home</button>
    </>
  );
};

export default CaloriesBarChart;
