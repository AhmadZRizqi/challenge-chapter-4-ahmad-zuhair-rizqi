import { Outlet } from "react-router-dom";
import '../App.css'
import { RiCalendarTodoFill } from "react-icons/ri"

export default function Wrapper(){
    return(
        <>
        <div className="header">
            <h1 >Todo List React Application <RiCalendarTodoFill /> </h1> 
            
        </div>
        <Outlet />
        <footer>Ahmad Zuhair Rizqi [FEJS-2]</footer>
        </>
    )
}