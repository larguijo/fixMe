import axios from 'axios';
import types from './types';

export const fetchEntity = (entity) =>
  async dispatch => {
    const res = await axios.get(`/api/${entity}`);
    dispatch({ type: types[entity][`FETCH_${entity.toUpperCase()}_ALL`], payload: res.data });
  }

export const createEntity = (entity) =>
  async dispatch => {
    const res = await axios.get(`/api/${entity}`);
    dispatch({ type: types[entity][`CREATE_${entity.toUpperCase()}`], payload: res.data });
  }
