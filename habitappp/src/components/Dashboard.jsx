import {React, useState} from 'react'
import { format } from "date-fns";
import { Calendar } from './Calendar';
import ToDoList  from './ToDoList';
import { Banner } from './Banner';
import { Nav } from './Nav';
export const Dashboard = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const setTodayDate = () => {
        setCurrentDate(new Date())
    }


  return (
   <div>
   <div>
        <Banner></Banner>
       </div>



       
    <div className="mt-12 flex justify-evenly content-center flex-row items-start">
    
    <div className="one mt-8">
    

    
        <Calendar 
        // className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800"
        value={currentDate} onChange={setCurrentDate} setTodayDate={setTodayDate}/>
</div>
        <div className="two">
        
        <div className=" todolist rounded-lg shadow-lg">
      
        <div className=" todolist rounded-lg shadow-lg">
      
       <ToDoList date={currentDate} />
       </div>
       </div>
      
        </div>
       
    </div> 
    </div>
  )
}
