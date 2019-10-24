import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectActions from '../../actions/projectActions';
import { getSelectedProject } from '../../selectors/projectSelectors';

const ProjectDashboard = ({ match: { params: { id: projectId } } }) => {
  const dispatch = useDispatch();
  const project = useSelector(getSelectedProject);
  const fetchProject = (id) => dispatch(ProjectActions.fetchProject(id));

  useEffect(() => {
    fetchProject(projectId);
  },
    [projectId]);

  return (
    <React.Fragment>
      {project &&
        (
          <div>
            <h2 className="header">{project.name}</h2>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default ProjectDashboard;