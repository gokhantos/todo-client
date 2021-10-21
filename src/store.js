import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import todoReducers from './reducer/todoReducers';

const initialState = {};

export const middleware = [thunk];

const store = createStore(
  todoReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;