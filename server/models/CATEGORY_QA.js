const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CATEGORY_QA', {
    CATEGORY_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CATEGORY_NAME: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "카테고리 이름"
    },
    CATEGORY_IMG: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "카테고리 사진"
    }
  }, {
    sequelize,
    tableName: 'CATEGORY_QA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CATEGORY_ID" },
        ]
      },
    ]
  });
};
