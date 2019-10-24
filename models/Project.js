module.exports = (db, dt) => {
  const Project = db.define('project',
    {
      name: {
        type: dt.STRING,
        comment: 'Nombre',
        allowNull: false,
        validate: {
          len: [3, 100],
          isUppercase: true
        }
      },
      description: {
        type: dt.STRING,
        comment: 'Descripción',
        allowNull: false,
        validate: {
          len: [3, 500],
        }
      },
      status: {
        type: dt.STRING,
        comment: 'Estado',
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
          isIn: [['ACTIVE', 'CLOSED']]
        }
      }
    }, {
      underscored: true
    }
  )
  return Project;
};