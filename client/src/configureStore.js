import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer.js';

export const middlewares = [ReduxThunk];