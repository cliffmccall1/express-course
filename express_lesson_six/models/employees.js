"use strict";
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define(
    "employees",
    {
      EmployeeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      LastName: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      Title: DataTypes.STRING,
      ReportsTo: DataTypes.INTEGER,
      BirthDate: DataTypes.STRING,
      HireDate: DataTypes.STRING,
      Address: DataTypes.STRING,
      City: DataTypes.STRING,
      State: DataTypes.STRING,
      Country: DataTypes.STRING,
      PostalCode: DataTypes.STRING,
      Phone: DataTypes.STRING,
      Fax: DataTypes.STRING,
      Email: DataTypes.STRING,
      Deleted: DataTypes.BOOLEAN
    },
    {
      timestamps: false
    }
  );

  return employees;
};
