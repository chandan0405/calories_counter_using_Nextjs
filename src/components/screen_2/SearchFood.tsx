"use client"
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { IoSearch } from "react-icons/io5";
import "../../css/search.css";
import { usePathname } from 'next/navigation'
import axios from 'axios';
import DatePickerComp from "../DatePickerComp";
import MealToggle from "./MealToggle";
import { debounce } from 'lodash';
import FoodCard from './FoodCard';
import FoodQtyCard from './FoodQtyCard';
import { useRouter } from 'next/navigation'
import { FoodDataItem, useMealStore } from '@/store/useMealstore';
import { useFoodStore } from '@/store/useFoodStore';
import { useTempMealStore } from '@/store/useTempMealStore';

interface FoodItem extends FoodDataItem {
  id: string;
  name: string;
  calories: number;
  weight: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string; 
  quantity: number;
}

const SearchFood: React.FC = () => {
  const [showClear, setShowClear] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [isFocussed, setIsFocussed] = useState<boolean>(true);
  const [nutrition, setNutrition] = useState<any | null>(null);
  const [showQtyCard, setShowQtyCard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const meals = useTempMealStore((state) => state.meals);
  const tempMealItems : FoodItem[]= useMealStore((state) => state.mealData);
  const selectedFoods = useFoodStore((state) => state.selectedFoods);
  const selectedDate = useFoodStore((state) => state.selectedDate);
  const addFoodItem = useMealStore((state) => state.addFoodItem);
  const resetTempMeals = useMealStore((state) => state.resetTempMeals);
  const setSelectedDate = useFoodStore((state) => state.setSelectedDate);
  const pathname = usePathname();
  const date = pathname.split('/').pop();
  const router = useRouter();

  useEffect(() => {
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate)
      } else {
        console.error('Invalid date format');
      }
    }
  }, [date]);

  const fetchResults = useCallback(
    debounce(async (query) => {
      if (query) {
        setLoading(true);
        try {
          const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': "4cfd35d9",
              'x-app-key': "aadf56b3f31bea462a87a6c7e14e24ca",
            },
          });
          const data = await response.json();
          setResults(data.common || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 600),
    []
  );

  const fetchNutrition = async (foodName: string) => {
    try {
      const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        query: foodName,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': "4cfd35d9",
          'x-app-key': "aadf56b3f31bea462a87a6c7e14e24ca",
        },
      });

      const foodData = response.data.foods[0];
      setNutrition(foodData);
      setShowQtyCard(true);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults, meals]);

  const handleSearch = (e:any) => {
    setIsFocussed(false);
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    setShowClear(value.length > 0);
  };

  const handleSave = () => {
    const currentDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let currentMeals = JSON.parse(localStorage.getItem(currentDate)|| "{}") ;

    const selectedMealType = selectedFoods.toLowerCase();
    if (!currentMeals[selectedMealType]) {
      currentMeals[selectedMealType] = [];
    }

    tempMealItems?.forEach((item) => {
      currentMeals[selectedMealType].push(item);
    });

    localStorage.setItem(currentDate, JSON.stringify(currentMeals));
    router.push('/');
    resetTempMeals()
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowClear(false);
    setIsFocussed(true);
  };

  const memoizedResults = useMemo(() => (
    results.map((result, index) => (
      <li key={index} onClick={() => fetchNutrition(result.food_name)}>
        {result.food_name}
      </li>
    ))
  ), [results]);

  const saveToTempMeal = (foodData:any) => {
    addFoodItem(foodData)
    setShowQtyCard(false);
  };

  const handleEdit = (id:string) => {
    const item = tempMealItems.find(item => item.id === id);
    if (item) {
      setNutrition({
        ...item,
        id: id,
      });
      setShowQtyCard(true);
    }
  };

  return (
    <div className='search_food_container'>
      <DatePickerComp />
      <MealToggle />
      <div className='search_container'>
        <div className="icon-container">
          <IoSearch className="search-icon" />
        </div>
        <input
          type="text"
          className="input_box"
          placeholder='Search...'
          value={query}
          onChange={handleSearch}
        />
        {showClear && <button className="clear-button" onClick={clearSearch}>✖</button>}
      </div>

      {loading ? <p className='loading-Item'>Loading...</p> : <ul className="results-list">{memoizedResults}</ul>}

      <div className='foodcard__container'>
        {isFocussed && tempMealItems?.map((item, index) => (
          <FoodCard
            key={item.id}
            image={item.image}
            name={item.name}
            calories={item.calories}
            weight={item.weight}
            protein={item.protein}
            carbs={item.carbs}
            fat={item.fat}
            id={item.id}
            quantity={item.quantity}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div className='save_btn_container'>
        <button onClick={handleSave} className='save-btn'>Done</button>
      </div>
      <div className='foodqty_modal_container'>
        {nutrition && (
          <FoodQtyCard
            show={showQtyCard}
            onClose={() => setShowQtyCard(false)}
            initialNutritionalValues={{
              calories: Math.floor(nutrition.nf_calories || nutrition.calories),
              protein: Math.floor(nutrition.nf_protein || nutrition.protein),
              carbs: Math.floor(nutrition.nf_total_carbohydrate || nutrition.carbs),
              fat: Math.floor(nutrition.nf_total_fat || nutrition.fat),
              weight: Math.floor(nutrition.serving_weight_grams || nutrition.weight),
              image: (nutrition.photo?.thumb || nutrition.image),
              name: (nutrition.food_name || nutrition.name),
              quantity: (nutrition.quantity),
              id: (nutrition.id)
            }}
            onSave={saveToTempMeal}
            clearSearch={clearSearch}
            id={nutrition.id}
          />
        )}
      </div>
    </div>
  );
};

export default SearchFood;
