import React from 'react';
import {configure, shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../../App';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from "moxios";
import { addTodos, deleteTodos, getTodos, updateTodos } from '../../actions/actions';
import { ADD_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../../actions/types';
const mockStore = configureMockStore([thunk]);
configure({ adapter: new EnzymeAdapter() });

const todoResponseMock = [
    {
        id: "1",
        task: "Buy Milk",
        status: true
    }
]

beforeEach(() => {
    moxios.install();
})

afterEach(() => {
    moxios.uninstall();
});

describe("Get todo action", () => {

    it("Should get todos", () => {
        moxios.wait(() => {
            const req = moxios.requests.mostRecent();
            req.respondWith({
                status: 200,
                response: todoResponseMock
              });
        });
        const expectedActions = [
            {
              type: GET_TODOS,
              payload: todoResponseMock
            }
          ];

        const store = mockStore({ todo: [] })

        return store.dispatch(getTodos()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        });
    });

})

describe("Create todo action ", () => {

    it("Should create a todo", () => {
        const responseMock = {id: "1", task: "Buy milk", status: false};
        moxios.wait(() => {
            const req = moxios.requests.mostRecent();
            req.respondWith({
                status: 200,
                response: responseMock
              });
        });
        const expectedActions = [{type: ADD_TODO, payload: {id: "1", task: "Buy milk", status: false}}];

        const store = mockStore({ todo: [] })
        return store.dispatch(addTodos(responseMock))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
})

describe("Update todo action ", () => {

    it("Should update a todo", () => {
        const responseMock = {id: "1", task: "Buy milk", status: false};
        moxios.wait(() => {
            const req = moxios.requests.mostRecent();
            req.respondWith({
                status: 200,
                response: responseMock
              });
        });
        const expectedActions = [{type: UPDATE_TODO, payload: {id: "1", task: "Buy milk", status: false}}];

        const store = mockStore({ todo: [] })
        return store.dispatch(updateTodos(responseMock))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
})



describe("Delete todo action ", () => {

    it("Delete update a todo", () => {
        const responseMock = {id: "1", task: "Buy milk", status: false};
        moxios.wait(() => {
            const req = moxios.requests.mostRecent();
            req.respondWith({
                status: 200,
                response: responseMock
              });
        });
        const expectedActions = [{type: DELETE_TODO, payload: responseMock}];

        const store = mockStore({})
        return store.dispatch(deleteTodos(responseMock.id))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
})