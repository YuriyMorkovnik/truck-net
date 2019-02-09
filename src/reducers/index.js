import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import rides from '../reducers/rides';

export default combineReducers({
  form,
  rides,
})