"use client";
import React from 'react';
import '../css/MealCard.css';
import { useRouter } from 'next/navigation';
import { useFoodStore } from '@/store/useFoodStore';

interface MealCardProps {
  mealType: string;
  totalCalories: number;
  items: Array<{ name: string; calories: number }>;
}

const MealCard: React.FC<MealCardProps> = ({ mealType, totalCalories, items }) => {
  const router = useRouter();
  const selectedDate = useFoodStore((state)=>state.selectedDate);
  const setSelectedFoods= useFoodStore((state)=>state.setSelectedFoods)

  const handleCardClick = () => {
    setSelectedFoods(mealType)
    const formattedDate = selectedDate.toLocaleDateString('en-CA');
    router.push(`/search/${formattedDate}`);
  };

  return (
    <div className="meal-card" onClick={handleCardClick}>
      <h2>{mealType}</h2>
      <p className="total-calories">{totalCalories} calories</p>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="d-flex justify-content-between">
            <span>{item.name}</span>
            <span>{item.calories} cal</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealCard;
