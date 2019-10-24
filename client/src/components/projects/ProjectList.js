import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../selectors/projectSelectors';
import Project from './Project';

const ProjectList = () => {

  const projects = useSelector(getProjects);

  const renderProjects = () => {
    return projects ? projects.map(p => <Project key={p.id} proyect={p} />) : null;
  }
  return renderProjects()
}

export default ProjectList;