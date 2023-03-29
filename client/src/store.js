import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];
const initialState = {};
const store = configureStore({
	reducer: rootReducer,
	middleware: middleware,
	initialState,
});

export default store;
