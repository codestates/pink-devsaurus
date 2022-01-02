const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class USER extends Model {
    static associate(models) {
      USER.hasMany(models.ANSWER, {
        foreignKey: "USER_ID",
      });
      USER.hasMany(models.BOARD_QA, {
        foreignKey: "USER_ID",
      });
      USER.belongsToMany(models.BOARD_QA, {
        through: "LIKES_BOARD",
        foreignKey: "USER_ID",
      });
    }
  }

  USER.init(
    {
      USER_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      EMAIL: {
        type: DataTypes.STRING(89),
        allowNull: false,
        comment: "유저 이메일",
        unique: "EMAIL",
      },
      USERNAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "유저 닉네임",
        unique: "USERNAME",
      },
      PASSWORD: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "유저 패스워드",
      },
      CREATED_REG: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "유저 생성일",
      },
      PROFILE_IMG: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "프로필 사진데이터",
      },
    },
    {
      sequelize,
      tableName: "USER",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "USER_ID" }],
        },
        {
          name: "EMAIL",
          unique: true,
          using: "BTREE",
          fields: [{ name: "EMAIL" }],
        },
        {
          name: "USERNAME",
          unique: true,
          using: "BTREE",
          fields: [{ name: "USERNAME" }],
        },
      ],
    }
  );

  return USER;
};
