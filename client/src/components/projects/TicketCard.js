import React from 'react';
import {Link} from 'react-router-dom';

const TicketCard = ({ ticket: { id, name, description, projectId } }) => {
  return (

    <div className="col s12 m12">
      <div className="card gray lighten-1">
        <div className="card-content black-text">
          <span><Link to={`/project/${projectId}/ticket/${id}`}> {name}</Link></span>
          <p className="truncate">{description}</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  )
}

export default TicketCard;