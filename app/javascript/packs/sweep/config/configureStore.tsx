import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from '../redux/index';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

declare global {
  interface Window {
    devToolsExtension: any;
  }
}

const configureStore = (initialState={}) => {

  const store = createStore(
    combineReducers({
      rootReducer,
      routing: routerReducer
    }),
    initialState, composeWithDevTools(
      applyMiddleware(thunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux', () => {
      const nextRootReducer = require('../redux').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

export type storeType  = ReturnType<typeof configureStore>;

export default configureStore;
