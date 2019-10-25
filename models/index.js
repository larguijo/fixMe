const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const keys = require('../config/keys');
const { database, userName, password, host, dialect } = keys;
const sequel = new Sequelize(database, userName, password, {
  host,
  dialect
});
const db = {};

sequel
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log('Loading', file);
    const model = sequel.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Relationships
db.category.project = db.category.belongsTo(db.project, { foreignKey: { allowNull: false } });
db.ticket.project = db.ticket.belongsTo(db.project, { foreignKey: { allowNull: false } });
db.ticket.category = db.ticket.belongsTo(db.category, { foreignKey: { allowNull: false } });

// sequel.sync({ force: true });
// sequel.sync();

console.log('DB', db);
db.sequelize = sequel;
db.Sequelize = Sequelize;

module.exports = db;
