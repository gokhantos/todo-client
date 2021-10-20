import React, {useState, useEffect} from "react";
import { addTodo, completeTodo, deleteTodo, getTodos, undoTodo } from "./Api";

function App() {
  const [todos, setTodos] = useState([]);
    const [values, setValues] = useState({
        task: "",
        status: "",
    });

    const { task } = values;

    const handleChange = name => event => {
        setValues({ ...values , [name]: event.target.value});
    }

    const fetchData = async () => {
      const res = await getTodos();
      setTodos(res.data);
    }
    

    useEffect(() => {
      fetchData();
    }, []);

    const checkStatus = (status, id) => {
      if(status){
        undoTodo(id).then(() => fetchData());
      }else{
        completeTodo(id).then(() => fetchData());
      }
    }

    const listItems = () => {
      if(todos){
        return(
          todos.map((item) =>
            <li id="todo-list" key={item._id}>
              <strong id="todo-text">{item.task}</strong>
              <input  id="todo-checkbox" type="checkbox" defaultChecked={item.status} onChange={handleChange('status')} onClick={() => {checkStatus(item.status, item._id)}} {...item.status}/>
              <button type="button" id="todo-delete-button" onClick={() => deleteTodo(item._id).then(() => fetchData())} value="Delete">Delete</button>
           </li>
          )
        )
      }
    }
  return (
    <div>
      <h1 data-testid="todo-header">Todo App</h1>
      <label>
        Add todo:
      <input data-testid="textbox-todo" onChange={handleChange('task')} value={task} id="todo-textbox"/>
      <button data-testid="add-todo-button" id="todo-add-button" onClick={() => addTodo({task, status: false}).then(() => setValues({ ...values, task: '' })).then(() => fetchData())}>Add Todo</button>
    </label>
    {listItems()}
    </div>
  );
}

export default App;
