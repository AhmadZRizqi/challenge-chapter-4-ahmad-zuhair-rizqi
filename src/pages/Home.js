import  { useState, useEffect } from "react";
import '../App';
import '../App.css';
import TodoList from "../components/ToDoList";
import Loading from "../components/Loading";
import axios from "axios";
import { BiRefresh } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
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

  const handleDeleteDone = async () => {
    Promise.all(
      data.filter(e => e.complete).map(async ({ id }) => {
        await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
          method:'DELETE',
        })
      })
    )
    setRefetchData(true)
  };

  const handleDeleteALL = async () => {
    Promise.all(
      data.filter(e => e.id).map(async ({ id }) => {
        await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
          method:'DELETE',
        })
      })
    )
    setRefetchData(true)
  };

  const handleComplete = async (id) => {
    let updatedTodos = data.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        axios.patch(` https://fake-api-coba.herokuapp.com/todos/${id}`,{
          complete:todo.complete,
        })
      }
      return todo;
    });
    setData(updatedTodos);
  };

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

  // const handleGetAll = async () => {
  //   setLoading(true);
  //   axios({
  //     method: 'GET',
  //     url: ' https://fake-api-coba.herokuapp.com/todos',
  //   })
  //     .then((res) => {
  //       setData(res?.data);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //       setRefetchData(false);
  //     });
  // };

  return (
    <div className="todo-app">
      <h1>TodoSearch</h1>
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

      <h1>TodoList</h1>
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
              onClick={() => setRefetchData(true)}>
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
              style={{ marginRight: 5 }}
              onClick={() => handleDeleteDone()}>
                Delete Done Task
        </button>
        <button
              onClick={() => handleDeleteALL()}
              className="button-deleteTask-item">
                Delete All Task
        </button>
      </div>
      
      <hr className="seperator" />
      {loading ?  (<Loading />):(data?.map((todo) => {        
        return (
          <TodoList
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            todo={todo}
            key={todo.id}
          />
        );
      }))}
    </div>
  );
}

export default Home;
