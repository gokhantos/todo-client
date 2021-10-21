import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import todoReducers from '../reducer/todoReducers';
import {middleware} from './../store';


export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(todoReducers, initialState);
};