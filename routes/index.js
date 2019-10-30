const models = require('../models');
const genericRoutes = require('./genericRoutes');
const ticketRoutes = require('./ticketRoutes');
module.exports = (app) => {
  genericRoutes(app, models);
  ticketRoutes(app, models);
} 
