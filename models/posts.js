
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("Post", {
        id:
        { type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrament: true,
            primaryKey:true
        },

        body: DataTypes.STRING,
        people_id: {
         type: DataType.INT,
            references: "peoples",
            referncesKey: 'id'
        }
    });
 
    return User;
};