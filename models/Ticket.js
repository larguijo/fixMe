const statuses = require('../utils/constants').project.STATUS;
module.exports = (db, dt) => {
  const Ticket = db.define('ticket', {
    name: {
      type: dt.STRING(100),
      comment: 'Nombre',
      allowNull: false,
      validate: {
        len: [3, 100],
        isUppercase: true
      }
    },
    description: {
      type: dt.STRING(4000),
      comment: 'Descripción',
      allowNull: false,
      validate: {
        len: [3, 4000],
      }
    },
    status: {
      type: dt.STRING(20),
      comment: 'Estado',
      allowNull: false,
      defaultValue: statuses[0],
      validate: {
        isIn: [statuses]
      }
    }
  }, {
      underscored: true,
      freezeTableName: true
    }
  );

  return Ticket;
}