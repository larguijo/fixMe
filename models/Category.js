module.exports = (db, dt) => {
  const Category = db.define('category', {
    name: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
        isUppercase: true
      }
    },
    description: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        len: [3, 500],
      }
    },
    status: {
      type: dt.STRING,
      allowNull: false,
      defaultValue: 'ACTIVE',
      validate: {
        isIn: [['ACTIVE', 'CLOSED']]
      }
    }
  }, {
      underscored: true
    }
  );

  return Category;
}