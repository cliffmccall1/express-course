"use strict";
module.exports = (sequelize, DataTypes) => {
  const planets = sequelize.define(
    "planets",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING,
      numberOfMoons: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );

  return planets;
};
