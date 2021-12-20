const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LIKES_BOARD', {
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "유저 FK"
    },
    BOARD_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "게시판 FK"
    },
    ANSWER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "답변글 FK"
    }
  }, {
    sequelize,
    tableName: 'LIKES_BOARD',
    timestamps: false
  });
};
