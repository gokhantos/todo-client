/*
 @jest-environment node
*/

const assert = require('assert')
const { Pact } = require('@pact-foundation/pact')
const {getTodos, addTodo, completeTodo, undoTodo, deleteTodo} = require('../Api');
jest.setTimeout(60000);

describe('Todo Api', () => {
    const provider = new Pact({
        port: 8080,
        consumer: 'Todo Client',
        provider: 'Todo Api',
        cors: true
    })

    beforeAll(() => provider.setup());
    afterAll(() => provider.finalize());
    afterEach(() => provider.verify());

    describe('Get todo items', () => {
        it("Should return all todo items", async() => {
            const expectedResponse = {
                todos: [
                    {
                        _id: "jfkanvsjksd1341kjfvs",
                        text: 'Buy milk',
                        status: false
                    },
                    {
                        _id: "vmcjxkbdnreu343321",
                        text: 'Buy fruits',
                        status: false
                    }
                ]
            }

            provider.addInteraction({
                state: "there are 2 todos",
                uponReceiving: 'a request for todos',
                withRequest: {
                    path: '/api/todo',
                    method: 'GET',
                    headers: {'Accept': 'application/json; charset=utf-8'}
                },
                willRespondWith: {
                    status: 200,
                    body: expectedResponse
                }
            })
            let response = await getTodos();
            //console.log(response);
            expect(response.data).toEqual(expectedResponse);
        })
    })

    describe("Create a todo item", () => {
        it('Should create a todo item', async () => {
            const expectedResponse = {
                "success": true
            }

            const requestbody = {
                _id: "1vcnjxkndsjkf42gr0",
                task: 'Buy milk',
                status: false
            }

            provider.addInteraction({
                state: "a todo item created",
                uponReceiving: "create item request",
                withRequest: {
                    method: "POST",
                    path: "/api/todo",
                    headers: {'Accept': 'application/json; charset=utf-8'},
                    body: requestbody
                },
                willRespondWith: {
                    status: 200,
                    body: expectedResponse
                }
            })

            const response = await addTodo(requestbody);
            expect(response.data).toEqual(expectedResponse);
        })
    })

    describe("Complete an item", () => {
        it("Should complete an item", async() => {
            const expectedResponse = {
                "success": true
            }


            const requestbody = {
                _id: "mfdkls27r8fvbhjs",
                task: "Buy milk",
                status: true
            }            

            provider.addInteraction({
                state: 'Complete a todo item',
                uponReceiving: 'a request to complete a todo item',
                withRequest: {
                    method: 'PUT',
                    path: `/api/completeTodo/${requestbody._id}`,
                    headers: {'Accept': 'application/json; charset=utf-8'},
                    body: {"status": true},
                },
                willRespondWith: {
                    status: 200,
                    body: expectedResponse
                }
            })

            const response = await completeTodo(requestbody._id);
            //console.log(response.data);
            expect(response.data).toEqual(expectedResponse);
        })
    })

    describe("Undo an item", () => {
        it("Should undo an item", async() => {
            const expectedResponse = {
                "success": true
            }


            const requestbody = {
                _id: "mfdkls27r8fvbhjs",
                task: "Buy milk",
                status: false
            }            

            provider.addInteraction({
                state: 'Undo a todo item',
                uponReceiving: 'a request to undo a todo item',
                withRequest: {
                    method: 'PUT',
                    path: `/api/undoTodo/${requestbody._id}`,
                    headers: {'Accept': 'application/json; charset=utf-8'},
                    body: {"status": false},
                },
                willRespondWith: {
                    status: 200,
                    body: expectedResponse
                }
            })

            const response = await undoTodo(requestbody._id);
            expect(response.data).toEqual(expectedResponse);
        })
    })

    describe("Delete a todo item", () => {
        it("Should delete todo item", async () => {
            const expectedResponse = {
                "success": true
            }
            const requestbody = {
                _id: "mfdkls27r8fvbhjs",
                task: "Buy milk",
                status: false
            }         

            provider.addInteraction({
                state: "Delete a todo item",
                uponReceiving: "a request to delete a todo item",
                withRequest: {
                    method: 'DELETE',
                    path: `/api/deleteTodo/${requestbody._id}`,
                    headers: {'Accept': 'application/json; charset=utf-8'}
                },
                willRespondWith: {
                    status: 200,
                    body: expectedResponse
                }
            })

            const response = await deleteTodo(requestbody._id);
            expect(response.data).toEqual(expectedResponse);
        })
    })


})