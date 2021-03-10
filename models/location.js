// Creating our trips model
module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      // The email cannot be null, and must be a proper email before creation
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      city_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      trips_id: {
          type: DataTypes.INTEGER,
          references: 'trips',
          referencesKey: 'id'
      }
    });
    return Location;
  };
  