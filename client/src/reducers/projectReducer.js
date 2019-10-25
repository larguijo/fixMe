
import types from '../actions/types';

const initialState = { projects: [], selected: null, tickets: [], isLoading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.project.FETCH_ALL: {
      return {
        ...state,
        projects: action.payload
      }
    }
    case types.ticket.FETCH_ALL: {
      return {
        ...state,
        tickets: action.payload,
        isLoading: false
      }
    }
    case types.project.FETCH: {
      return {
        ...state,
        selected: action.payload
      }
    }

    case types.ticket.LOADING: {
      return {
        ...state, isLoading: true
      }
    }
    default:
      return state;
  }
}