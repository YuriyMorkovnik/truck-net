import { createStore } from 'redux';

import reducers from './reducers';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducers, reduxDevTools);