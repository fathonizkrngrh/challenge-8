const { request } = require("express");

const auth = require("./auth");
const user_game_biodata = require("./user_game_biodata");
const user_game_history = require("./user_game_history");

module.exports = {
  auth,
  user_game_biodata,
  user_game_history,
};
