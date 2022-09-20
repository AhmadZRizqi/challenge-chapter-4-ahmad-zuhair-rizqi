import handleDelete from "../App"
import handleEdit from "../App"

const ToDoList  = ({data}) => {
    return <ul className="list-group">  
        {data.map((todo) => (
        <li class="list-group-item d-flex justify-content-between align-items-center">
            {todo.task}
            <div>
            <input type="checkbox" checked={todo.complete}/>
                <button
                    style={{
                    marginLeft: '10px',
                    backgroundColor: 'orange',
                    }}
                    onClick={() => handleEdit(todo.id)}
                >
                    Edit
                </button>

                <button
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'red',
                }}
                onClick={() => handleDelete(todo.id)}
              >
                delete
              </button>
            </div>
        </li>))}
    </ul>;
};

export default ToDoList;