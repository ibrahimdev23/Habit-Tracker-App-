import React, { useEffect, useReducer, useState } from 'react'
import { nextDay,lightFormat, subMonths, sub, add, differenceInCalendarDays, differenceInDays, compareAsc, endOfMinute, endOfMonth, formatDistance, startOfMonth, subDays, format, setDate, lastDayOfMonth, getMonth, getDay, getDate, getYear } from "date-fns";
import { Cell } from './Cell';


export const Calendar = ({value, onChange, onClick, setTodayDate, setStreakCount}) => {


const [streaks, setStreaks] = useState([])
const [streakCount, updateStreakCount] = useState([])

const daysWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


       //date fns libary 
const startingDate = startOfMonth(value)

const endingDate = endOfMonth(value)
const numberOfDaysMonth = differenceInDays(endingDate, startingDate)+1
const prefix = startingDate.getDay()
const suffix = 6 - endingDate.getDay()
const endingDateLastMonth = endOfMonth(sub(value, {months: 1}))
const startingDateLastMonth = startOfMonth(sub(value, {months: 1}))
const numberOfDaysLastMonth = differenceInDays(endingDateLastMonth, startingDateLastMonth)+1
const prefixStart = numberOfDaysLastMonth - prefix


const perviousMonth = () => {
    onChange(sub(value, {months: 1}))
}
const perviousYear = () => {
    onChange(sub(value, {years: 1}))
    
}
const nextMonth = () => {
    onChange(add(value, {months: 1}))
}
const nextYear = () => {
    onChange(add(value, {years: 1}))
}

const isYesterday = (currentDate, previousDate) => {
  // Normalize the dates to midnight to ignore time parts
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0); // Set time to midnight
    return normalized;
  };

  // Normalize both dates
  const normCurrent = normalizeDate(currentDate);
  const normPrevious = normalizeDate(previousDate);

  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

  // Check if the difference between the two dates is exactly one day
  return (normPrevious - normCurrent) === oneDay;
};

const calculateStreakCount = (updatedStreaks) => {
  if (updatedStreaks.length === 0) return 0;
  
  // Convert date strings to Date objects and sort in descending order
  const sortedDates = updatedStreaks
    .map(date => new Date(date)) 
    .sort((a, b) => b - a);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date
  
  const mostRecentDate = sortedDates[0];
  
  // Check if the most recent date is today or yesterday
  if (!isToday(mostRecentDate) && !isYesterday(mostRecentDate, today)) {
    return 0; // Reset streak to 0 if most recent date is not today or yesterday
  }
  
  let count = 1; 
  let lastDate = mostRecentDate;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    if (isYesterday(currentDate, lastDate)) {
      count++;
      lastDate = currentDate;
    } else {
      break; 
    }
  }
  
  return count;
};

// Helper function to check if a date is today
const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

 
const addToStreaks = (index) => {
  const newDate = setDate(value, index)
  const result = compareAsc(newDate, value)
 
  let month = getMonth(newDate)
  let day = getDate(newDate)
  let year = getYear(newDate)

  let savedDate = lightFormat(new Date(year, month, day), 'yyyy-MM-dd')
  if (result == 0) {
    if (!streaks.includes(savedDate)) {
      const updatedStreaks = [...streaks, savedDate];
      setStreaks(updatedStreaks);
      localStorage.setItem('streak', JSON.stringify(updatedStreaks)); 
      const newStreakCount = calculateStreakCount(updatedStreaks);
      updateStreakCount(newStreakCount); 
    } 
  } 
}

useEffect(() => {
  const storedStreaks = localStorage.getItem('streak');
  if (storedStreaks) {
    const parsedStreaks = JSON.parse(storedStreaks);
    setStreaks(parsedStreaks)
    const initialStreakCount = calculateStreakCount(parsedStreaks);
    updateStreakCount(initialStreakCount);
  }
}, [])











  return (
    <>
   


                <div className="mt-0 pt-0 mb-4 text-center">
                    <span className=" bg-gradient-to-r from-stone-500 via-red-500 to-gray-500 bg-clip-text text-transparent text-5xl font-black">
                        Current Streak: {streakCount} day{streakCount !== 1 ? 's' : ''}
                    </span>
                </div>
        
    <div className=" flex gap-8 mb-5 ml-50 w-100 justify-center" >
    
    <button className="flex  gap-4 textlg bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
    onClick={setTodayDate}
    >Today
    </button>
 
    </div>
  

    <div className="w-[650px] border-t border-l bg-white rounded-lg shadow ">
    
      <div className=" grid grid-cols-7 items-center jusify-center text-center ">
        <Cell props={"<<"} onClick={perviousYear} isMenu={true}></Cell>
       
        <Cell props={"<"} onClick={perviousMonth} isMenu={true}> </Cell>
        <Cell className={"col-span-3"}
         props={format(value, "LLLLLL yyyy")} isMenu={true} ></Cell>

        <Cell props={">"} onClick={nextMonth} isMenu={true}></Cell>
        <Cell props={">>"} onClick={nextYear} isMenu={true}></Cell>
        {daysWeek.map((day, index) => {
          return (
            <Cell
              className={"text-sm font-bold uppercase"}
              key={index}
              props={day}
              isMenu={true}
            ></Cell>
          );
        })}

    

        {Array.from({ length: prefix }).map((_, index) => {
    
        const date = prefixStart + index + 1
       
       
        return (
          <Cell
            key={index}
            props={date}
            isNotCurrent={true}
            isDate={true}
          >
        
          </Cell>
        );
      })}
        {Array.from({ length: numberOfDaysMonth }).map((_, index) => {
        const date = index + 1;
        const isToday = date === value.getDate()
        let mark = false;
       
     
        let pos  = []
        
        for(let i = 0; i < streaks.length;i++){
         
          if(getMonth(streaks[i]) === getMonth(value) && getYear(streaks[i]) === getYear(value)){
              pos.push(getDate(streaks[i]))
      
          }
        }
      
       
        return (
          <Cell
            key={date}
            props={date}
            onClick={() => addToStreaks(date)}
            isDate={true}
            pos={pos}
            mark={mark}
          
            

          >
        
          </Cell>
        );
      })}

      {Array.from({length: suffix}).map((_,index)=> {
       const date =  index + 1
       
        
            return <Cell key={index} 
           // isNotCurrent={true}
            isDate={true}
            props={date}/>
        })}

      </div>
    </div>
    </>
  )
}


