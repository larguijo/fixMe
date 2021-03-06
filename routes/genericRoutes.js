module.exports = (app, models) => {
  app.get('/api/ping', async (req, res) => res.send("OK"));

  app.get('/api/:modelName/define', async (req, res) => {
    const { modelName } = req.params;
    const { projectId } = req.query;
    const { rawAttributes: attributes } = models.sequelize.models[modelName];
    let references = {};
    // Find references.
    const refs = Object
      .keys(attributes)
      .filter(key => attributes[key].references && attributes[key].references.model !== 'project')
      .reduce((list, key) => {
        list.push({ model: key, conf: attributes[key] });
        return list;
      }, []);

    try {
      const conditions = {};
      if (projectId) conditions.projectId = projectId;
      await Promise.all(refs.map(async e => {
        const values = await models[e.conf.references.model].findAll({ where: conditions });
        references[e.model] = values;
        return values;
      }));
    } catch (error) {
      references: { error }
    }

    res.json({ attributes, references });
  });

  app.get('/api/:modelName/:id', async (req, res) => {
    try {
      const { modelName, id } = req.params;
      const record = await models[modelName].findByPk(id);
      res.json(record);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/:modelName', async (req, res) => {
    try {
      const { modelName } = req.params;
      const { query } = req;
      const records = await models[modelName].findAll({
        where: query
      });
      res.json(records);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

  app.post('/api/:modelName', async (req, res) => {
    try {
      const { modelName } = req.params;
      const record = await models[modelName].create(req.body);
      res.json(record);
    } catch (error) {
      console.log('Error', error);
      res.status(500).send(error);
    }
  });

  app.put('/api/:modelName/:id', async (req, res) => {
    const { modelName, id } = req.params;
    try {
      const record = await models[modelName].update(req.body, { where: { id } });
      res.json(record);
    } catch (error) {
      console.log('Error', error);
      res.status(500).send(error);
    }
  });
}