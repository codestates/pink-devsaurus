const { Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class CATEGORY_QA extends Model {
    static associate(models) {
      CATEGORY_QA.hasMany(models.BOARD_QA, {
        foreignKey: "CATEGORY_ID",
      });
    }
  }

  CATEGORY_QA.init(
    {
      CATEGORY_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      CATEGORY_NAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "카테고리 이름",
      },
      CATEGORY_IMG: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "카테고리 사진",
      },
    },
    {
      sequelize,
      tableName: "CATEGORY_QA",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "CATEGORY_ID" }],
        },
      ],
    }
  );

  return CATEGORY_QA;
};
