import React from 'react';
import { Link } from 'react-router-dom';

export default function Project({ proyect: { id, name, description } }) {
  return <li><Link to={`/project/${id}`} data-constrainwidth="false">{name}</Link></li>
}