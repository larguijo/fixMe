import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import projectActions from '../../actions/projectActions';
// import Draggable from 'react-draggable';

const TicketCard = ({ ticket: { id, name, description, projectId, category } }) => {
  const dispatch = useDispatch();
  const setNext = () => setTicketStatus('next');
  const setPrevious = () => setTicketStatus('previous');
  const setTicketStatus = (status) => dispatch(projectActions.updateTicketStatus(projectId, id, status));
  // const [initialX, setInitialX] = useState();

  // const onStart = (e, ui) => {
  //   if (!initialX) setInitialX(e.clientX);
  //   console.log('onStart', e.clientX);
  // };

  // const onStop = (e, ui) => {
  //   console.log('onStop', e.clientX);
  //   // e.setClientX(initialX);
  // };

  // const dragHandlers = { onStart, onStop };

  // const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
  return (
    // <Draggable axis="x" {...dragHandlers}>
    <div className="col s12 m12">
      <div className="card gray lighten-1">
        <div className="card-content black-text">
          <span><Link to={`/project/${projectId}/ticket/${id}`}> {name}</Link></span>
          <div><b>{category.name}</b></div>
          <p className="truncate">{description}</p>
        </div>
        <div className="card-action center">
          <a class="waves-effect waves-light" onClick={setPrevious}><i class="material-icons">arrow_back</i></a>
          <a class="waves-effect waves-light" onClick={setNext}><i class="material-icons">arrow_forward</i></a>
        </div>
      </div>
    </div>
    // </Draggable>
  )
}

export default TicketCard;