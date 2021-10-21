import React from 'react';
import {configure, mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import App from '../../App';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {todoReducers} from "../../reducer/todoReducers";
import { createStore } from 'redux'
import { act } from 'react-dom/test-utils';

configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const store = mockStore([
    {
        id: "1",
        task: "Buy milk",
        status: false
    },
    {
        id: "2",
        task: "Buy chocolate",
        status: false
    }
]);
  
describe("Testing Todos Component", () => {
    
    it("should render add button and delete button correctly", async () => {
        let wrapper;
    await act(async () => {
        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
            );
        });
        expect(wrapper.find("button")).toHaveLength(3);
    });

    it("should render add textbox and checkboxes correctly", async () => {
        let wrapper;
    await act(async () => {
        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
            );
        });
        expect(wrapper.find("input")).toHaveLength(3);
    });

    it("should render header correctly", async () => {
        let wrapper;
    await act(async () => {
        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
            );
        });
        expect(wrapper.find("h1")).toHaveLength(1);
    });

    it("should render todo list correctly", async () => {
        let wrapper;
    await act(async () => {
        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
            );
        });
        expect(wrapper.find("li")).toHaveLength(2);
    });
});