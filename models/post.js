
// Creating our Post model
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        body: {
            type: DataTypes.STRING(255)
        },
        trips_id: {
            type: DataTypes.INTEGER,
            // references: {
            //   model: 'Trips',
            //   key: 'id'
        //   }
        }
    });
 
    return Post;
};