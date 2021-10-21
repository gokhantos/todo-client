import {GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO} from './types';
import axios from 'axios';

let baseURL = "http://localhost:8080";
export const getTodos = () => async (dispatch) => {
    try{
        const res = await axios.request({
            method: "GET",
            url: baseURL + "/api/todos",
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-type': 'application/json; charset=utf-8',
            },
        })
        dispatch({
            type: GET_TODOS,
            payload: res.data,
          });
    }catch(err){
        console.log(err);
    }
}

export const addTodos = (todoItem) => async (dispatch) => {
    try{
        const res = await axios.request({
            method: "POST",
            url: baseURL + "/api/todos",
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-type': 'application/json; charset=UTF-8',
            },
            data: todoItem
        })

        dispatch({
            type: ADD_TODO,
            payload: res.data,
          });
    }catch(err){
        console.log(err);
    }
}

export const updateTodos = (todoId) => async (dispatch) => {
    try{
        const res = await axios.request({
            method: "PUT",
            url: baseURL + `/api/todos/${todoId}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        dispatch({
            type: UPDATE_TODO,
            payload: res.data,
          });
    }catch(err){
        console.log(err);
    }
}

export const deleteTodos = (todoId) => async (dispatch) => {
    try{
        const res = await axios.request({
            method: "DELETE",
            url: baseURL + `/api/todos/${todoId}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-type': 'application/json; charset=utf-8',
            }
        })
        dispatch({
            type: DELETE_TODO,
            payload: res.data,
          });
    }catch(err){
        console.log(err);
    }
}