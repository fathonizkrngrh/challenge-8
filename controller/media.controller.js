const path = require("path");
const { media: Media } = require("../models");
const { user_game } = require("../models");

module.exports = {
  uploadSingleVideo: async (req, res) => {
    const { userId } = req.params;

    const findUser = await user_game.findOne({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "user notfound",
      });
    }
    const fileUrl = `${req.protocol}://${req.get("host")}/videos/${
      req.file.filename
    }`;
    const newMedia = await Media.create({
      filename: req.file.filename,
      url: fileUrl,
      user_id: userId,
      type: path.extname(req.file.filename),
    });

    return res.json({
      url: newMedia.url,
    });
  },
  uploadSingleImage: async (req, res) => {
    const { userId } = req.params;

    const findUser = await user_game.findOne({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "user notfound",
      });
    }
    const fileUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const newMedia = await Media.create({
      filename: req.file.filename,
      url: fileUrl,
      user_id: userId,
      type: path.extname(req.file.filename),
    });

    return res.json({
      url: newMedia.url,
    });
  },
  showMedia: async (req, res) => {
    const { user_id, type } = req.query;
    const { userId } = req.params;

    const findUser = await user_game.findOne({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "user notfound",
      });
    }

    let media = null;

    if (user_id && type) {
      media = await Media.findAll({
        where: {
          user_id,
          type,
        },
      });
    } else if (user_id) {
      media = await Media.findAll({
        where: {
          user_id,
        },
      });
    } else if (type) {
      media = await Media.findAll({
        where: {
          type,
        },
      });
    } else if (!type && !user_id) {
      media = await Media.findAll();
    }

    if (!media) {
      return res.status(404).json({
        status: false,
        message: "media not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "success to get media",
      data: media,
    });
  },
};
