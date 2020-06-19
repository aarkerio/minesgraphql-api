import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootReducer from '../redux/index';
import { routerReducer } from 'react-router-redux';

declare global {
  interface Window {
    devToolsExtension: any;
  }
}

export default function configureStore(initialState={}) {

  const store = createStore(
    combineReducers({
        rootReducer,
        routing: routerReducer
    })
    ,
    initialState,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

