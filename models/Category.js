module.exports = (db, dt) => {
  const Category = db.define('category', {
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
      type: dt.STRING(500),
      comment: 'Descripción',
      allowNull: false,
      validate: {
        len: [3, 500],
      }
    },
    status: {
      type: dt.STRING(20),
      comment: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVE',
      validate: {
        isIn: [['ACTIVE', 'CLOSED']]
      }
    }
  }, {
      underscored: true,
      freezeTableName: true
    }
  );

  return Category;
}