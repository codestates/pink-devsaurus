const { Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class LIKES_BOARD extends Model {
    static associate(models) {
      LIKES_BOARD.belongsTo(models.USER, {
        foreignKey: "USER_ID",
      });
      LIKES_BOARD.belongsTo(models.BOARD_QA, {
        foreignKey: "BOARD_ID",
      });
      LIKES_BOARD.belongsTo(models.ANSWER, {
        foreignKey: "ANSWER_ID",
      });
    }
  }

  LIKES_BOARD.init(
    {
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "유저 FK",
      },
      BOARD_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "게시판 FK",
      },
      ANSWER_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "답변글 FK",
      },
    },
    {
      sequelize,
      tableName: "LIKES_BOARD",
      timestamps: false,
    }
  );

  return LIKES_BOARD;
};
