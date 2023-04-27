import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMIddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';


// creating saga middleware:
const sagaMiddleware = createSagaMIddleware();


// middelwares are run before an action is executed.
// Adding sagaMiddleware to middlewares array
const middlewares = [ process.env.NODE_ENV !== 'production' && logger, sagaMiddleware ].filter( Boolean );

const composeEnhancers = ( process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

const composedEnhancers = composeEnhancers( applyMiddleware( ...middlewares ) );


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'cart' ],
};

const persistedReducer = persistReducer( persistConfig, rootReducer );


export const store = createStore( persistedReducer, undefined, composedEnhancers );

// starting sagamiddleware
sagaMiddleware.run( rootSaga );

export const persistedStore = persistStore( store );