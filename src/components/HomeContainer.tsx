"use client";
import React from 'react';
import MealCard from './MealCard';
import "../css/main.css";
import Header from './Header';
import CalorieChart from './CalorieChart';

interface MealItem {
  name: string;
  calories: number;
}

interface Meal {
  mealType: string;
  totalCalories: number;
  items: MealItem[];
}

interface HomeProps {
  meals: Meal[];
}

const Home: React.FC<HomeProps> = ({ meals }) => {
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






// "use client";
// import React from 'react';
// import MealCard from './MealCard';
// import "../css/main.css";
// import Header from './Header';
// import CalorieChart from './CalorieChart';
// interface HomeProps {
//     meals: Array<{ totalCalories: number }>;
//   }
  
//   const Home: React.FC<HomeProps> = ({ meals }) => {
//     return (
//         <>
//             <Header />
//             <CalorieChart meals={meals} />
//             <div className="main">
//                 {meals?.map((meal, index) => (
//                     <MealCard
//                         key={index}
//                         mealType={meal.mealType}
//                         totalCalories={meal.totalCalories}
//                         items={meal.items}
//                     />
//                 ))}
//             </div>
//         </>
//     );
// };

// export default Home;
