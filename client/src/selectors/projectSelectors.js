export const getProjects = state => state.project.projects;
export const getSelectedProject = state => state.project.selected;
export const getTickets = state => state.project.tickets;
export const getOpen = state => {
  return getTickets(state).filter(t => t.status === 'OPEN');
}
export const getWorking = state => {
  return getTickets(state).filter(t => t.status === 'WORKING');
}

export const getReview = state => {
  return getTickets(state).filter(t => t.status === 'SENT TO REVIEW');
}

export const getClosed = state => {
  return getTickets(state).filter(t => t.status === 'CLOSED');
}

export const getIsLoading = state => state.project.isLoading;