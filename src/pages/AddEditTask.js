import  { useState, useEffect } from "react";
import  { useNavigate, useParams } from "react-router-dom";
import '../App';
import '../App.css';
import TodoForm from "../components/ToDoForm";
import TodoList from "../components/ToDoList";
import Loading from "../components/Loading";
import axios from "axios";

export default function AddEditTask(){
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    // const [refetchData, setRefetchData] = useState(true);
    
    const handleAdd = async (task) => { if (task == '') {
        // e.preventDefault();
        alert("Masukkan Data Terlebih Dahulu")
      } else {
        axios.post(` https://fake-api-coba.herokuapp.com/todos`,{
            task:task,
            complete:false,
        })
        .then(()=>{navigate('/');}
        )
    }
};
    const handleEdit = async (task) => { if (task == '') {
        // e.preventDefault();
        alert("Masukkan Data Terlebih Dahulu")
    } else {
        axios.patch(` https://fake-api-coba.herokuapp.com/todos/${params.id}`,{
            task:task,
        })
        .then(()=>{navigate('/');})
    }
};

    useEffect(() => {
        if (params.id){
            axios({
                method: 'GET',
                url:  `https://fake-api-coba.herokuapp.com/todos/${params.id}`,
              })
                .then((res) => {
                  setData(res?.data.task);
                });
        }
    }, [params.id]);

    return(
        <div className="todo-add-edit">
        <h1>Todo Input</h1>
        <h1>{(data.task)}</h1>
        <TodoForm addTodo={params.id? handleEdit:handleAdd} />
            <div className="button-cancel">
                <button className="btn-cancel-item"
                    onClick={() => navigate(`/`)}>
                    cancel
                </button>
            </div>
        </div>

    )
}