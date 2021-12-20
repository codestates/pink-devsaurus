const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BOARD_QA', {
    BOARD_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "작성자 ID"
    },
    CATEGORY_ID: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "카테고리_ID"
    },
    TITLE: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "게시판 제목"
    },
    CONTENT: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      comment: "게시판 내용"
    },
    CREATED_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "최초 작성일"
    },
    MODIFY_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    },
    SELECTED_BREPLY_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "채택된 답변글 ID"
    },
    SELECTED_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "책택된 유저 ID"
    }
  }, {
    sequelize,
    tableName: 'BOARD_QA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BOARD_ID" },
        ]
      },
    ]
  });
};
