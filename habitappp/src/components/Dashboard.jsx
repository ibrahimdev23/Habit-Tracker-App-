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
   <div className='mt-0 pt-0'>
   <Nav></Nav>
   <div>
        <Banner></Banner>
       </div>



       
    <div className="mt-0 flex justify-evenly content-center flex-row items-start">
    
    <div className="one mt-8">
    

    
        <Calendar 
        value={currentDate} onChange={setCurrentDate} setTodayDate={setTodayDate}/>
</div>

        <div className="two mt-0 pt-0">
        
        <div className=" todolist rounded-lg shadow-lg">
      
        <div className=" todolist rounded-lg shadow-lg">
        
        <div className="mt-30 text-center">
       
        <span type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        {format(new Date(), " LLLL dd yyyy")}
        </span>            </div>
        

       <ToDoList date={currentDate} />
       </div>
       
       </div>
      
        </div>
       
    </div> 
    </div>
  )
}
