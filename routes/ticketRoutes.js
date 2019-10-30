const STATUSES = require('../utils/constants').project.STATUS;

module.exports = (app, models) => {
  app.get('/api/project/:projectId/ticket/card', async (req, res) => {
    try {

      const result = await models.ticket.findAll({
        where: {
          projectId: req.params.projectId
        },
        include: [
          { model: models.category }
        ]
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/api/project/:projectId/ticket/:ticketId/status/:status', async (req, res) => {
    try {
      const { projectId, ticketId, status } = req.params;
      const ticket = await models.ticket.findByPk(ticketId);
      const { status: currentStatus } = ticket;
      const index = STATUSES.findIndex(s => s === currentStatus);

      if (status === 'next' && index >= 0 && index < STATUSES.length - 1) {
        ticket.status = STATUSES[index + 1];
      } else if (status === 'previous' && index > 0 && index < STATUSES.length) {
        ticket.status = STATUSES[index - 1];
      } else {
        ticket.status = status;
      }

      await ticket.save();
      res.send(ticket);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
}