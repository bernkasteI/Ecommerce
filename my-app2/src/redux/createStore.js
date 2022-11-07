import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddle();

export const middleWares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
sagaMiddleware.run(rootSaga);

export default store;

