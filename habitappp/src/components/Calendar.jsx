import React, { useState } from 'react'
import { nextDay,lightFormat, subMonths, sub, add, differenceInCalendarDays, differenceInDays, compareAsc, endOfMinute, endOfMonth, formatDistance, startOfMonth, subDays, format, setDate, lastDayOfMonth, getMonth, getDay, getDate, getYear } from "date-fns";
import { Cell } from './Cell';


export const Calendar = ({value, onChange, onClick, setTodayDate, setStreakCount}) => {


const [streaks, setStreaks] = useState([])
//const streaks = []


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
    // getStreaks()
}
const perviousYear = () => {
    onChange(sub(value, {years: 1}))
    
}
const nextMonth = () => {
    onChange(add(value, {months: 1}))
   // getStreaks()
}
const nextYear = () => {
    onChange(add(value, {years: 1}))
}


// const handleNewDate = (index) => {
//     const newDate = setDate(value, index)
//     onClick(newDate)
   
// }

const addToStreks = (index) => {
    let tempStreaks = []
    const newDate = setDate(value, index)
    const result = compareAsc(newDate, value)
    
    let month = getMonth(newDate)
    let day = getDate(newDate)
    let year = getYear(newDate)
   // console.log(year)
    
    let savedDate = lightFormat(new Date(year, month, day), 'yyyy-MM-dd')
    if(result != 1 && result != -1){
       // console.log("True")
        if(!tempStreaks.includes(savedDate)){
           // console.log("added")
           // let y = getYear(savedDate)
           // console.log(y)
           //streaks.push(savedDate)
           //setStreaks((savedDate))
           //setStreaks(savedDate => [...savedDate, streaks ])
          // streaks.push(savedDate) 
          tempStreaks.push(savedDate)
           //setStreaks(...savedDate)
           
         } 
         setStreaks(tempStreaks)
        //  else {
        //    // setStreaks(streaks => streaks.concat(savedDate))
        
        //  }
         //else {
    
        //     streaks.push(savedDate)
        // }
       // streaks.push(newDate)
    } 
   // console.log("hey")
    //console.log(newDate)
   
  // console.log(streaks)
}

  return (
    <>
    <div className=" flex gap-8 mb-5 ml-50 w-100 justify-center" >
    <button className="flex  gap-4 textlg bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
    onClick={setTodayDate}
    >Today
    </button>
    <button className="flex gap-4 textlg bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
    
    >Add Streak
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
            //onClick={() => addToStreks(date)}
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
            console.log(streaks)
          // console.log(getMonth(streaks[0]))
           //console.log(value.getMonth())
          if(getMonth(streaks[i]) === getMonth(value) && getYear(streaks[i]) === getYear(value)){
              pos.push(getDate(streaks[i]))
              console.log("pushed")
          }
        }
      
       
        return (
          <Cell
            key={date}
            props={date}
            onClick={() => addToStreks(date)}
           // isToday={isToday}
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
            //onClick={() => addToStreks(date)}
            isNotCurrent={true}
            isDate={true}
            props={date}/>
        })}

      </div>
    </div>
    </>
  )
}


