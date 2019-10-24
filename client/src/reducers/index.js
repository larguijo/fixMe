import { combineReducers } from 'redux';
import project from './projectReducer';

const all = combineReducers({
  project
});

export default all;