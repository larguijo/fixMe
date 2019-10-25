import React from 'react';
import TicketCard from './TicketCard';
import { useSelector } from 'react-redux';
import { getOpen, getWorking, getReview, getClosed } from '../../selectors/projectSelectors';

const TicketList = () => {
  const openTickets = useSelector(getOpen);
  const workingTickets = useSelector(getWorking);
  const reviewTickets = useSelector(getReview);
  const closedTickets = useSelector(getClosed);
  const columnClass = 'col s12 m3 grey lighten-2'

  const renderTickets = (tickets) => tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />);

  return (
    <div className="row grey lighten-4">
      <div className={columnClass}>
        <h5>Pendiente</h5>
        {renderTickets(openTickets)}
      </div>
      <div className={columnClass}>
        <h5>En curso</h5>
        {renderTickets(workingTickets)}
      </div>
      <div className={columnClass}>
        <h5>En revisión</h5>
        {renderTickets(reviewTickets)}
      </div>
      <div className={columnClass}>
        <h5>Cerrados</h5  >
        {renderTickets(closedTickets)}
      </div>
    </div>);
}


export default TicketList;