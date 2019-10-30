import axios from 'axios';
import types from './types';

const fetchProject = (id) =>
  async dispatch => {
    console.log('fetch', id);
    const res = await axios.get(`/api/project/${id}`);
    dispatch({ type: types.project.FETCH, payload: res.data });
  }

const fetchTicketsForCards = (id) =>
  async dispatch => {
    const res = await axios.get(`/api/project/${id}/ticket/card`);
    dispatch({ type: types.ticket.FETCH_ALL, payload: res.data });
  }

const updateTicketStatus = (projectId, ticketId, status = 'next') =>
  async dispatch => {
    await axios.put(`/api/project/${projectId}/ticket/${ticketId}/status/${status}`);
    const res = await axios.get(`/api/project/${projectId}/ticket/card`);
    dispatch({ type: types.ticket.FETCH_ALL, payload: res.data });
  }


export default {
  fetchProject,
  fetchTicketsForCards,
  updateTicketStatus
}
