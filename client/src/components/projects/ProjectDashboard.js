import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectActions from '../../actions/projectActions';
import { fetchEntity } from '../../actions/genericCrud'
import { getSelectedProject, getTickets, getIsLoading } from '../../selectors/projectSelectors';
import TicketList from './TicketList';
import { Link } from 'react-router-dom';

const ProjectDashboard = ({ match: { params: { id: projectId } } }) => {
  const dispatch = useDispatch();
  const project = useSelector(getSelectedProject);
  const tickets = useSelector(getTickets);
  const isLoading = useSelector(getIsLoading);
  const fetchProject = (id) => dispatch(ProjectActions.fetchProject(id));
  const fetchTickets = (id) => dispatch(fetchEntity('ticket', { projectId: id }));

  useEffect(() => {
    fetchProject(projectId);
    fetchTickets(projectId)
  },
    [projectId]);

  return (
    <React.Fragment>
      {project &&
        (
          <div>
            <h3 className="header">{project.name}</h3>
            {isLoading && (<div class="progress">
              <div class="indeterminate"></div>
            </div>)}
            <TicketList />
            <div className="fixed-action-btn">
              <Link to={`/project/${projectId}/ticket/new`} className="btn-floating btn-large blue">
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default ProjectDashboard;