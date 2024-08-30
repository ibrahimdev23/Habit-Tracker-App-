import {React, useState, useEffect} from 'react'
import { format, set } from "date-fns";
import { ToDoListItem } from './ToDoListItem'


let nextId = 0


 const ToDoList = ({date}) => {

   // const {user, setUser} = useContext(UserContext)

	const [currentDate, setCurrentDate] = useState(Date.now())

	const [tasks, setTasks] = useState([
		{}
])

	const [text, setText] = useState('')

   
	const addTask = (text) => {
		
	if(text !== ""){
		const newTask = {
			id:nextId++,
			date: Date.now(),
			text, 
			completed: false
		}
		setTasks([...tasks, newTask ])
		localStorage.setItem('toDoItem', JSON.stringify([...tasks, newTask]));

		setText("")
	}	
	
	}

	const deleteTask = (id, text) => {
		console.log(text["text"])
		setTasks(tasks.filter(task => task.id !== id))
		//localStorage.setItem('toDoItem', JSON.stringify(tasks));
		let itemsArr = JSON.parse(localStorage.getItem("toDoItem"))
		 itemsArr.splice(itemsArr.indexOf(text["text"]))
		 localStorage.setItem("toDoItem", JSON.stringify(itemsArr))
	}

	
    let filteredTasks = tasks.filter(elm => elm)
    const toggleCheckedMark = (id) => {
		
		setTasks(filteredTasks.map(task => {
			if(task.id === id){
				
				return {...task, completed: !task.completed}
				
			} else{
				
				return task 
			}
		}))
	}

	useEffect(()=> {
		const storedToDos = localStorage.getItem('toDoItem');
		if (storedToDos) {
		  setTasks(JSON.parse(storedToDos))
		}
	  }, [])
	  

  return (
   <div class=" c flex-grow items-center justify-center text-gray-600  ">
	
		<div class="c max-w-full p-8 bg-white w-96">
			<div class="flex items-center mb-6">
				
				<h4 class="font-semibold ml-3 text-lg">
					To Do List:
				</h4>
			</div>
		</div>
	
		<ul  >
		
			{filteredTasks.map(task => (
				<li>
				<div className="flex items-center group/item" >
				<ToDoListItem
				key={task.id}
				task={task}
				deleteTask={deleteTask}
				toggleCheckedMark={toggleCheckedMark} 
				
				/>
				</div>
				</li>
			))}
			
		
		</ul>
		
		<div>
		<input 
		className="border ml-5 mt-20 mr-5"
		placeholder="Add new task"
			value={text ? text : "add new task"}
			onChange={e => setText(e.target.value)}>
			
			</input>
			<button
			
			onClick={() => addTask(text)}
			>Add Task
			
			</button>
			</div>
		</div>
  )
}

export default ToDoList;