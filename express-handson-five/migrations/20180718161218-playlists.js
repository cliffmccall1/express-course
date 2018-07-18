"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        "playlists",
        "NumberOfTracks",
        Sequelize.INTEGER,
        {
          allowNull: true
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn("playlists", "NumberOfTracks")];
  }
};
