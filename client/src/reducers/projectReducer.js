
import types from '../actions/types';

const initialState = { projects: [], selected: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.project.FETCH_PROJECT_ALL: {
      return {
        ...state,
        projects: action.payload
      }
    }
    case types.project.FETCH_PROJECT: {
      return {
        ...state,
        selected: action.payload
      }
    }
    default:
      return state;
  }
}