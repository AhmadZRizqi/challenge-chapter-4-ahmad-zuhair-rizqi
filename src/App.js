import axios from "axios";
import  { useState, useEffect } from "react";
import './App.css';
import Loading from "./components/Loading";
import ToDoList from "./components/ToDoList";

function App() {
  const [id, setID] = useState('');
  const [namaTask, setNamaTask] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(true);
  
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
  //     setTodos(result.data);
  //   });
  // }, []);

  const fetchData = async () => {
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

  useEffect(() => {
    if (refetchData) {
      fetchData();
    }
  }, [refetchData]);

  const handleAdd = async () => {
    try {
      await axios({
        method: 'POST',
        url: ` https://fake-api-coba.herokuapp.com/todos`,
        todos:{
          title:namaTask
        }
      });
      setNamaTask('');
      setRefetchData(true);
    } catch (error) {
      console.log(error);
    }
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

  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: `https://fake-api-coba.herokuapp.com/todos${id}`,
      });
      setRefetchData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios({
        method: 'PATCH',
        url: `https://fake-api-coba.herokuapp.com/todos${id}`,
      });
      setRefetchData(true);
      setID('')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-form">
      <h1>Todo List</h1>
      <div className="button-getComplete d-flex justify-content-between align-items-center">
      <button
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            width: '100%'
          }}
            onClick={() => handleGetComplete()}>
              Show Completed Task
      </button>
      <button
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            width: '100%'
          }}
            onClick={() => handleGetNotComplete()}>
              Show Not Completed Task
      </button>
      </div>

      <div className="form-title">
      <input style={{
            width: '50%',
            justifySelf:'center',
          }}
      className="form" type="text" placeholder="isi kegiatan" value={namaTask} onChange = {(e) => setNamaTask(e.target.value)} />
        <button className="btn btn-success"
          style={{
            marginLeft: '10px',
          }}
            onClick={() => handleAdd()}>
              Add
        </button>
        <button className="btn btn-primary" style={{
            marginLeft: '10px',
          }} 
          onClick={() => setRefetchData(true)}>
            Refresh
        </button>
      </div>

      <div className="todos-list">
        {/* {todos ? <ToDoList todos= {todos} /> : <Loading />} */}
        {loading ? ( <Loading /> ) : (<ToDoList data = {data} />) }
      </div>
      
    </div>
  );
}

export default App;
