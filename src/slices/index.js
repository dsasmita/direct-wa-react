import {combineReducers} from 'redux';

import historiesReducer from './histories.js';

const rootReducer = combineReducers({
  histories: historiesReducer,
});

export default rootReducer;
