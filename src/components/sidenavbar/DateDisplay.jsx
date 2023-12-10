import React, { useState, useEffect, useContext } from "react";
import { useDarkMode } from "../navbar/DarkModeContext";
import "./DateDisplay.css";

const DateDisplay = () => {
  const { isDarkMode } = useDarkMode();

  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    // Function to update the date and day
    const updateDate = () => {
      const now = new Date();

      const optionsDay = { weekday: "long" };
      const optionsMonth = { month: "long" };
      const optionsDate = { day: "numeric" };
      const optionsYear = { year: "numeric" };

      setCurrentDay(now.toLocaleDateString("en-US", optionsDay));
      setCurrentMonth(now.toLocaleDateString("en-US", optionsMonth));
      setCurrentDate(now.toLocaleDateString("en-US", optionsDate));
      setCurrentYear(now.toLocaleDateString("en-US", optionsYear));
    };

    // Update the date initially
    updateDate();

    // Update the date every second (for real-time clock)
    const intervalId = setInterval(updateDate, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className={`DateTime ${isDarkMode ? "dark-mode" : ""}`}>
      <p>{currentDay},</p>
      <p>
        {currentMonth} {currentDate},
      </p>
      <p>{currentYear}</p>
    </div>
  );
};

export default DateDisplay;
