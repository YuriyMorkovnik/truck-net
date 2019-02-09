import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    reduxDevTools
  )
);
