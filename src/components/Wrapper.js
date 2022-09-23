import { Outlet } from "react-router-dom";
import '../App.css'

export default function Wrapper(){
    return(
        <>
        <h1 className="header">ToDo App</h1>
        <Outlet />
        <footer>Ahmad Zuhair Rizqi [FEJS-2]</footer>
        </>
    )
}