import axios from 'axios';
import types from './types';

export const fetchEntity = (entity, conditions = {}) =>
  async dispatch => {
    const res = await axios.get(`/api/${entity}`, { params: conditions });
    if (types[entity].LOADING) dispatch({ type: types[entity].LOADING, payload: true });
    dispatch({ type: types[entity].FETCH_ALL, payload: res.data });
  }

export const createEntity = (entity) =>
  async dispatch => {
    const res = await axios.get(`/api/${entity}`);
    dispatch({ type: types[entity].CREATE, payload: res.data });
  }
