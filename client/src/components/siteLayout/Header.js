import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEntity } from '../../actions/genericCrud';
import { useDispatch } from 'react-redux';
import types from '../../actions/types';
import ProjectList from '../projects/ProjectList';

const Header = () => {
  const dispatch = useDispatch();
  const fetchProjects = (entity) => dispatch(fetchEntity(entity));

  useEffect(() => {
    fetchProjects(types.project.ENTITY);
  }, []);

  return (
    <React.Fragment>
      <ul id="projectList" className="dropdown-content" style={{ width: "max-content" }}>
        <li ><Link to="/project/new">Nuevo Projecto</Link></li>
        <li className="divider"></li>
        <ProjectList />
      </ul>
      <nav>
        <div className="nav-wrapper deep-purple darken-4">
          <a href="#" className="brand-logo">
            <i className="large material-icons">build</i> FIX ME
        </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a className="dropdown-trigger" href="#!" data-target="projectList">Projects<i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a href="collapsible.html">Session</a></li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Header;