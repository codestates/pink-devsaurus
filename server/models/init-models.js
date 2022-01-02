var DataTypes = require("sequelize").DataTypes;
var _ANSWER = require("./ANSWER");
var _BOARD_QA = require("./BOARD_QA");
var _CATEGORY_QA = require("./CATEGORY_QA");
var _LIKES_BOARD = require("./LIKES_BOARD");
var _USER = require("./USER");

function initModels(sequelize) {
  var ANSWER = _ANSWER(sequelize, DataTypes);
  var BOARD_QA = _BOARD_QA(sequelize, DataTypes);
  var CATEGORY_QA = _CATEGORY_QA(sequelize, DataTypes);
  var LIKES_BOARD = _LIKES_BOARD(sequelize, DataTypes);
  var USER = _USER(sequelize, DataTypes);


  return {
    ANSWER,
    BOARD_QA,
    CATEGORY_QA,
    LIKES_BOARD,
    USER,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
