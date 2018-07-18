"use strict";
module.exports = (sequelize, DataTypes) => {
  const playlists = sequelize.define(
    "playlists",
    {
      PlaylistId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: DataTypes.STRING,
      NumberOfTracks: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );
  return playlists;
};
