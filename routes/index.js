const models = require('../models');
const genericRoutes = require('./genericRoutes');
const ticketRoutes = require('./ticketRoutes');
const imageRoutes = require('./imageRoutes');
module.exports = (app) => {
  genericRoutes(app, models);
  ticketRoutes(app, models);
  imageRoutes(app);
} 
