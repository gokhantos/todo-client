import axios from "axios";

let baseURL = "http://localhost:8080";

export async function getTodos(){
    return axios.request({
        method: "GET",
        url: baseURL + "/api/todo",
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
    })
}

export async function addTodo(todoItem){
    return axios.request({
        method: "POST",
        url: baseURL + "/api/todo",
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        data: todoItem
    })
}

export async function completeTodo(todoId){
    return axios.request({
        method: "PUT",
        url: baseURL + `/api/completeTodo/${todoId}`,
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        data:{
            status: true
        }
    })
}

export async function undoTodo(todoId){
    return axios.request({
        method: "PUT",
        url: baseURL + `/api/undoTodo/${todoId}`,
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        data:{
            status: false
        }
    })
}

export async function deleteTodo(todoId){
    return axios.request({
        method: "DELETE",
        url: baseURL + `/api/deleteTodo/${todoId}`,
        headers: {
            'Accept': 'application/json; charset=utf-8',
        }
    })
}