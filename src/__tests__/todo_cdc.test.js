/*
 @jest-environment node
*/

const assert = require('assert')
const { Pact } = require('@pact-foundation/pact')
const {getTodos, addTodo, updateTodo, deleteTodo} = require('../Api');
const { boolean } = require('@pact-foundation/pact/src/dsl/matchers');
jest.setTimeout(60000);

let baseURL = "http://localhost:8081";

describe('Todo Api', () => {
    const provider = new Pact({
        port: 8081,
        consumer: 'Todo Client',
        provider: 'Todo Api',
        cors: true
    })

    beforeAll(() => provider.setup());
    afterAll(() => provider.finalize());
    afterEach(() => provider.verify());

    let addedTodo;

    describe("Create a todo item", () => {
        it('Should create a todo item', async () => {
            const expectedResponse = {
                id: "1",
                task: "Buy chocolate",
                status: false
            }

            const requestBody = {
                id: "1",
                task: "Buy chocolate",
            }

            provider.addInteraction({
                state: "a todo item created",
                uponReceiving: "create item request",
                withRequest: {
                    method: "POST",
                    path: "/api/todos",
                    headers: {'Accept': 'application/json; charset=utf-8', 
                            'Content-Type': 'application/json; charset=UTF-8'},
                    body: requestBody
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: expectedResponse
                }
            })

            const response = await addTodo(baseURL, requestBody);
            expect(response.data).toEqual(expectedResponse);
        })
    })

    describe('Get todo items', () => {
        it("Should return all todo items", async() => {
            const expectedResponse = [
                {
                    id: "1",
                    task: 'Buy chocolate',
                    status: false
                }
            ];

            provider.addInteraction({
                state: "there are 2 todos",
                uponReceiving: 'a request for todos',
                withRequest: {
                    path: '/api/todos',
                    method: 'GET',
                    headers: {'Accept': 'application/json; charset=utf-8'}
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: expectedResponse
                }
            })
            let response = await getTodos(baseURL);
            //console.log(response);
            expect(response.data).toEqual(expectedResponse);
        })
    })



    describe("Update a todo item", () => {
        it("Should update a todo item", async() => {
            const expectedResponse = {
                id: "1",
                task: 'Buy chocolate',
                status: true
            }

            const id = 1;

            provider.addInteraction({
                state: 'Update a todo item',
                uponReceiving: 'a request to update a todo item',
                withRequest: {
                    method: 'PUT',
                    path: `/api/todos/${id}`,
                    headers: {'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json; charset=UTF-8'
                    }
                },
                willRespondWith: {
                    status: 202,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: expectedResponse
                }
            })
            const response = await updateTodo(baseURL, id);
            //console.log(response.data);
            expect(response.data).toEqual(expectedResponse);
        })
    })


    describe("Delete a todo item", () => {
        it("Should delete todo item", async () => {
            const expectedResponse = "1";

            const id = "1";

            provider.addInteraction({
                state: "Delete a todo item",
                uponReceiving: "a request to delete a todo item",
                withRequest: {
                    method: 'DELETE',
                    path: `/api/todos/${id}`,
                    headers: {'Accept': 'application/json; charset=utf-8'}
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: expectedResponse
                }
            })

            const response = await deleteTodo(baseURL, id);
            expect(response.data).toEqual(parseInt(expectedResponse));
        })
    })

})