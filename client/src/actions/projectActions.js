import axios from 'axios';
import types from './types';

const fetchProject = (id) =>
  async dispatch => {
    console.log('fetch', id);
    const res = await axios.get(`/api/project/${id}`);
    dispatch({ type: types.project.FETCH, payload: res.data });
  }

export default {
  fetchProject
}
