import { applyMiddleware, createStore  } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'src/requests/rootSaga';
import rootReducer from './modules/rootReducer';

const initialState: State = {
    events: []
};

/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

/** Store */
const store = createStore(
    rootReducer,
    initialState as any,
    enhancer
);

sagaMiddleware.run(rootSaga);

export default store;