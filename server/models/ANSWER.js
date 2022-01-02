const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class ANSWER extends Model {
    static associate(models) {
      ANSWER.belongsTo(models.BOARD_QA, {
        foreignKey: "BOARD_ID",
      });
      ANSWER.belongsTo(models.USER, {
        foreignKey: "USER_ID",
      });
      ANSWER.belongsToMany(models.USER, {
        through: "LIKES_BOARD",
        foreignKey: "ANSWER_ID",
      });
    }
  }
  ANSWER.init(
    {
      ANSWER_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      BOARD_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시판_FK",
      },
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "작성자_FK",
      },
      ANSWER_CONTENT: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: "답변 내용",
      },
      CREATED_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "최초 작성일",
      },
      MODIFY_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "수정일",
      },
    },
    {
      sequelize,
      tableName: "ANSWER",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ANSWER_ID" }],
        },
      ],
    }
  );
  return ANSWER;

  // return sequelize.define(
  //   "ANSWER",
  //   {
  //     ANSWER_ID: {
  //       autoIncrement: true,
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //       primaryKey: true,
  //     },
  //     BOARD_ID: {
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //       comment: "게시판_FK",
  //     },
  //     USER_ID: {
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //       comment: "작성자_FK",
  //     },
  //     ANSWER_TITLE: {
  //       type: DataTypes.STRING(30),
  //       allowNull: false,
  //       comment: "답변 제목",
  //     },
  //     ANSWER_CONTENT: {
  //       type: DataTypes.STRING(1024),
  //       allowNull: false,
  //       comment: "답변 내용",
  //     },
  //     CREATED_DATE: {
  //       type: DataTypes.DATE,
  //       allowNull: false,
  //       defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
  //       comment: "최초 작성일",
  //     },
  //     MODIFY_DATE: {
  //       type: DataTypes.DATE,
  //       allowNull: false,
  //       defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
  //       comment: "수정일",
  //     },
  //   },
  //   {
  //     sequelize,
  //     tableName: "ANSWER",
  //     timestamps: false,
  //     indexes: [
  //       {
  //         name: "PRIMARY",
  //         unique: true,
  //         using: "BTREE",
  //         fields: [{ name: "ANSWER_ID" }],
  //       },
  //     ],
  //     associate: function (models) {
  //       models.ANSWER.belongsTo(models.BOARD_QA);
  //       models.ANSWER.belongsTo(models.USER);
  //     },
  //   }
  // );
};
