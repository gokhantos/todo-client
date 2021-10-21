import {
    GET_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO
  } from "../actions/types";

const initialState = [];

const todoReducers = (todos = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case GET_TODOS:
            return payload;

        case ADD_TODO:
          return [...todos, payload];
          
        case UPDATE_TODO:
          todos.map((todo) => {
              if (todo.id === payload.id) {
                return Object.assign({}, todo, {
                  ...action.payload,
                })};
          })

        case DELETE_TODO:
          const id =  action.payload;
        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) {
          return todos;
        }
        todos.splice(index, 1);
      return [...todos];
        default:
          return todos;
    }
}

  export default todoReducers;