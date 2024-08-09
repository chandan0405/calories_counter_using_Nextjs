"use client";
import React, {  useState } from 'react';
import "../css/header.css";
import { IoIosNotifications } from "react-icons/io";
import DatePickerComp from './DatePickerComp';
import { useSelector } from 'react-redux';

const Header = () => {
  const selectedDate = useSelector((state) => state.food.selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
 
  const getFormattedDate = () => {
    const today = new Date();
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formattedDate = getFormattedDate();
  

  return (
    <>
      <div className="header">
        <div className="header__title_date_container">
          <span className='header-title'>Hello, Chiku</span>
          <div className="date" onClick={() => setShowDatePicker(!showDatePicker)}>{formattedDate}</div>
        </div>
        <div className="notification">
          <div className="icon">
            <span role="img" aria-label="notification">
              <IoIosNotifications style={{ height: "20px", width: "20px" }} />
            </span>
          </div>
        </div>
      </div>
      {showDatePicker && (
        <DatePickerComp />
      )}
    </>
  );
}

export default Header;
