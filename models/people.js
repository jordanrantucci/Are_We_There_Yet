// Creating our People model
module.exports = function(sequelize, DataTypes) {
    var People = sequelize.define("People", {
      // The email cannot be null, and must be a proper email before creation
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      trips_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Trips',
            key: 'id'
        }
      }
    });
    return People;
  };
  