import {React, useState} from 'react'
import { format } from "date-fns";
import { Calendar } from './Calendar';
import ToDoList  from './ToDoList';


export const Dashboard = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const setTodayDate = () => {
        setCurrentDate(new Date())
        
        
    }
  return (
   
    <div className="mt-12 flex justify-evenly content-center flex-row items-start">
   
    <div className="one mt-8">
    

    
        <Calendar value={currentDate} onChange={setCurrentDate} setTodayDate={setTodayDate}/>
</div>
        <div className="two">
        
        <div className=" todolist rounded-lg shadow-lg">
      
        <div className=" todolist rounded-lg shadow-lg">
      
       <ToDoList date={currentDate} />
       </div>
       </div>
        </div>
       
    </div>
  )
}
