"use client";
import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/calorie.css";

const CalorieChart = ({ meals }) => {
  const totalcalories=2500;  //Taken fixed value;
  const totalfat= Math.floor((totalcalories*0.3)/9);
  const totalcarbs= Math.floor((totalcalories*0.45)/4);
  const totalprotein= Math.floor((totalcalories*0.25)/4);

  const totalBurntCalories = meals?.reduce((acc, meal) => acc + meal.totalCalories,
    0)||0;
  const totalconsumedFat=Math.floor((totalBurntCalories*0.3)/9) ||0;
  const totalconsumedProtein=Math.floor((totalBurntCalories*0.25)/4)||0;
  const totalconsumedCarbs=Math.floor((totalBurntCalories*0.45)/4)||0;

  const percentageProgressvalue= Math.floor((totalBurntCalories/totalcalories)*100)||0
  const percentageProgressvalueOfProtein= Math.floor((totalconsumedProtein/totalprotein)*100)||0
  const percentageProgressvalueofCarbs= Math.floor((totalconsumedCarbs/totalcarbs)*100)||0;
  const percentageProgressvalueofFat= Math.floor((totalconsumedFat/totalfat)*100)||0;

  return (
    <div className="calorie-chart">
      <div className="body">
        <div className="progress-circle">
          <CircularProgressbarWithChildren
            value={percentageProgressvalue}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee",
              pathColor: "#717dfa",
              textColor: "black"
            })}
          >
            <div className='calore_precentage_burnt'>
              <strong>{`${percentageProgressvalue}%`}</strong>
            </div>
            <div style={{ fontSize: 12 }}>
              Daily target achieved
            </div>
          </CircularProgressbarWithChildren>
          <div className='calorie_burnt'>
            <span className='total_calorie'> {totalBurntCalories}/{totalcalories} Kcal</span>
            <p className='total_eaten'> Eaten/Target</p>
          </div>
        </div>
        <div className="progress-bars">
          <div className="progress-bar">
            <div className="label">Protein</div>
            <div className="bar">
              <div className="fill_protein" style={{ width: `${percentageProgressvalueOfProtein}%` }}></div>
            </div>
            <div className="values">{totalconsumedProtein}/{totalprotein} g</div>
          </div>
          <div className="progress-bar">
            <div className="label">Fat</div>
            <div className="bar">
              <div className="fill_fat" style={{ width: `${percentageProgressvalueofFat}%` }}></div>
            </div>
            <div className="values">{totalconsumedFat}/{totalfat} g</div>
          </div>
          <div className="progress-bar">
            <div className="label">Carbs</div>
            <div className="bar">
              <div className="fill_carbs" style={{ width: `${percentageProgressvalueofCarbs}%` }}></div>
            </div>
            <div className="values">{totalconsumedCarbs}/{totalcarbs} g</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalorieChart;
