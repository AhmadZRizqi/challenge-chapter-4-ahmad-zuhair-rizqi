import  { useState, useEffect } from "react";
import '../App';
import '../App.css';
import TodoForm from "../components/ToDoForm";
import TodoList from "../components/ToDoList";
import Loading from "../components/Loading";
import axios from "axios";
import { BiRefresh } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [cmp, setCmp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url:  `https://fake-api-coba.herokuapp.com/todos${location.search}`,
    })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefetchData(false);
      });
  };

  useEffect(() => {
    if (refetchData) {
      fetchData();
    }
  }, [refetchData, location.search]);
  


  const handleDelete = async (id) => {
    await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
      method: "DELETE",
    })
    setRefetchData(true)
    .catch((err) => {
      console.log(err);
    });
};
  //   let updatedTodos = [...data].filter((todo) => todo.id !== id);
  //   setData(updatedTodos);
  // };
  // const completeTodo = async (id) => { if (data.complete === false){
  //   axios.patch(` https://fake-api-coba.herokuapp.com/todos${id}`,{
  //       complete: true,
  //     })
  // }

  // };

  const completeTodo = async (id) => {
    let updatedTodos = data.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      axios.patch(` https://fake-api-coba.herokuapp.com/todos/${id}`,{
        complete:todo.complete,
      })
      return todo;
    });
    setData(updatedTodos);
  };

//   const completeTodo = async (id) => {
//     await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
//       method: "PATCH",
//       data:{
//         complete:true,
//     }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

  const handleGetComplete = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: ' https://fake-api-coba.herokuapp.com/todos?complete=true',
    })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefetchData(false);
      });
  };

  const handleGetNotComplete = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: ' https://fake-api-coba.herokuapp.com/todos?complete=false',
    })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefetchData(false);
      });
  };

  const handleGetAll = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: ' https://fake-api-coba.herokuapp.com/todos',
    })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefetchData(false);
      });
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-form">
        <input
          value={search}
          placeholder="Search..."
          className="todo-input"
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <button 
          className="todo-button"
          onClick={() => {
            if (search) {
              navigate(`?task=${search}`);
            } else {
              navigate(`/`);
            }
            setRefetchData(true);
          }}
        >
          Search
        </button>
      </div>
      
      <div className="button-add">
        <button className="btn-add-item"
              onClick={() => navigate(`/task`)}>
                Add Data
        </button>
      </div>


      <div className="iconRefresh">
        <BiRefresh onClick={() => setRefetchData(true)}/>
      </div>

      <div className="button-get">
        <button
              className="button-get-item"
              style={{ marginRight: 5 }}
              onClick={() => handleGetComplete()}>
                Show Done Task
        </button>
        <button
              className="button-get-item"
              style={{ marginRight: 5 }}
              onClick={() => handleGetAll()}>
                Show All Task
        </button>
        <button
              className="button-get-item"
              onClick={() => handleGetNotComplete()}>
                Show Todo Task
        </button>
      </div>

      <div className="button-deleteTask">
        <button
              className="button-deleteTask-item"
              style={{ marginRight: 5 }}>
                Delete Done Task
        </button>
        <button
              className="button-deleteTask-item">
                Delete All Task
        </button>
      </div>
      
      <hr className="seperator" />
      {loading ?  (<Loading />):(data?.map((todo) => {        
        return (
          <TodoList
            handleDelete={handleDelete}
            completeTodo={completeTodo}
            todo={todo}
            key={todo.id}
          />
        );
      }))}
    </div>
  );
}

export default Home;
