"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../../css/barChart.css";
import { useRouter } from 'next/navigation';
import { useFoodStore } from '@/store/useFoodStore';

interface Meal {
  calories: number;
}

interface CalorieData {
  date: string;
  calories: number;
}

const CaloriesBarChart: React.FC = () => {
  const [calorieDataForChart, setCalorieDataForChart] = useState<CalorieData[]>([]);
  const router = useRouter();
  const selectedDate = useFoodStore((state) => state.selectedDate);

  const calculateTotalCaloriesForDate = (formattedDate: string): number => {
    let totalCalories = 0;

    if (typeof window !== 'undefined') {
      const dailyCalorieData = localStorage.getItem(formattedDate);
      if (dailyCalorieData) {
        const parsedData: Record<string, Meal[]> = JSON.parse(dailyCalorieData);
        Object.values(parsedData).forEach((mealArray: Meal[]) => {
          totalCalories += mealArray.reduce((total, meal) => total + meal.calories, 0);
        });
      }
    }

    return totalCalories;
  };

  const generateCalorieDataForLast7Days = (): CalorieData[] => {
    const calorieDataArray: CalorieData[] = [];
    const currentDate = new Date();

    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - dayOffset);

      const formattedDate = date.toLocaleDateString("en-US", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const displayDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const totalCaloriesForDay = calculateTotalCaloriesForDate(formattedDate);

      calorieDataArray.push({
        date: displayDate,
        calories: totalCaloriesForDay,
      });
    }

    return calorieDataArray;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCalorieDataForChart(generateCalorieDataForLast7Days());
    }
  }, [selectedDate]);

  const navigateToHome = () => {
    router.push('/');
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
        <div className='save_btn_container'>
          <button className="save-btn" onClick={navigateToHome}>Go to Home</button>
        </div>
      </div>
    </>
  );
};

export default CaloriesBarChart;
