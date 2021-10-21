import axios from "axios";



export async function getTodos(baseURL){
    return axios.request({
        method: "GET",
        url: baseURL + "/api/todos",
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-type': 'application/json; charset=utf-8',
        },
    })
}

export async function addTodo(baseURL, todoItem){
    return axios.request({
        method: "POST",
        url: baseURL + "/api/todos",
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-type': 'application/json; charset=UTF-8',
        },
        data: todoItem
    })
}

export async function updateTodo(baseURL, todoId){
    return axios.request({
        method: "PUT",
        url: baseURL + `/api/todos/${todoId}`,
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}

export async function deleteTodo(baseURL, todoId){
    return axios.request({
        method: "DELETE",
        url: baseURL + `/api/todos/${todoId}`,
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-type': 'application/json; charset=utf-8',
        }
    })
}