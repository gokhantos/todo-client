import React, {useState, useEffect} from "react";
//import { deleteTodo, getTodos, updateTodo } from "./Api";
import { useDispatch, useSelector } from "react-redux";
import {getTodos, addTodos, updateTodos, deleteTodos} from './actions/actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const App = (props) =>  {
  const [todo, setTodo] = useState({
    id: null,
    task: "",
    status: false
  });
  const todos = useSelector(todos => todos);

  const dispatch = useDispatch();

  const addTodo = () => {
    const {task} = todo;
    console.log(task);
    dispatch(addTodos({task: task, id: ((Math.random() * 100000 + 1).toFixed(0)).toString()}))
      .then(data => {
        setTodo({
          id: ((Math.random() * 100000 + 1).toFixed(0)).toString(),
          task: task,
          status: false
        });
        console.log(data);
      }).catch(err => {
        console.log(err);
      })
  }

  const handleChangeInput = name => event => {
    setTodo({ ...todo , [name]: event.target.value});
}
    useEffect(() => {
      dispatch(getTodos());
    }, [dispatch]);

  return (
    <div>
      <h1 data-testid="todo-header">Todo App</h1>
      <label>
        Add todo:
      <input data-testid="textbox-todo" value={todo.task} onChange={handleChangeInput("task")} id="todo-textbox"/>
      <button data-testid="add-todo-button" id="todo-add-button" onClick= {() => addTodo()} >Add Todo</button>
    </label>
    <ul>
        {todos.length > 0 &&
          todos.map((item) => {
            return([
              <li id='todo-list' key={item.id}>
              <strong id="todo-text">{item.task}</strong>
              <input  id="todo-checkbox" defaultChecked={item.status}  type="checkbox" onClick={() => dispatch(updateTodos(item.id))} />
              <button type="button" id="todo-delete-button" onClick={() => dispatch(deleteTodos(item.id))}>Delete</button>
              </li>
            ])
          })}
      </ul>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addTodos: bindActionCreators(addTodos, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
