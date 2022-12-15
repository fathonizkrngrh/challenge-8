const { user_game_history, sequelize } = require("../models");
const { user_game } = require("../models");
const { literal } = require("sequelize");

module.exports = {
  addRecord: async (req, res, next) => {
    try {
      const { user_id, points, match_played, rank } = req.body;

      // cek apakah user tersebut sudah terdaftar
      const existUser = await user_game.findOne({
        where: {
          id: user_id,
        },
      });
      if (!existUser) {
        return res.status(409).json({
          status: false,
          message: "User doesn't exist!!",
        });
      }

      const createdRecord = await user_game_history.create({
        user_id,
        points,
        match_played,
        rank,
      });

      return res.status(201).json({
        status: true,
        message: "success adding history",
        data: {
          user_id: createdRecord.user_id,
          points: createdRecord.points,
          match_played: createdRecord.match_played,
          rank: createdRecord.rank,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  showAll: async (req, res, next) => {
    try {
      const records = await user_game_history.findAll();
      if (records.length <= 0) {
        res.status(409).json({
          status: false,
          message: "empty record",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "data showed successfull",
        data: records,
      });
    } catch (err) {
      next(err);
    }
  },

  detailRecord: async (req, res, next) => {
    const { id } = req.params;
    let findRecords = await user_game_history.findOne({
      where: { user_id: id },
    });
    if (findRecords == null) {
      return res.status(409).json({
        status: false,
        message: "data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: "data has found",
      id: id,
      data: findRecords,
    });
  },
  rankingRecord: async (req, res, next) => {
    try {
      const groupRecord = await user_game_history.findAll({
        group: ["user_id"],
        attributes: [
          "user_id",
          [literal(`SUM("points")`), "total_points"],
          [literal(`SUM("match_played")`), "total_match_played"],
        ],
        raw: true,
        order: sequelize.literal("total_points DESC"),
      });
      return res.status(200).json({
        status: true,
        message: "record has ranked",
        data: groupRecord,
      });
    } catch (err) {
      next(err);
    }
  },
};
