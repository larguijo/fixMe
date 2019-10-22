const models = require('../models');

module.exports = (app) => {
  app.get('/api/ping', (req, res) => res.send("OK"));
  app.get('/api/:modelName/define', (req, res) => {
    const { modelName } = req.params;
    res.json(models.sequelize.models[modelName].rawAttributes);
  });

  app.get('/api/:modelName', async (req, res) => {
    try {
      const { modelName } = req.params;
      const records = await models[modelName].findAll();
      res.json(records);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/:modelName', async (req, res) => {
    try {
      const { modelName } = req.params;
      const record = await models[modelName].create(req.body);
      res.json(record);
    } catch (error) {
      res.status(500).send(error);
    }
  });
}