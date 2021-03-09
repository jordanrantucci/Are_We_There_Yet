module.exports = function (sequelize, DataTypes) {
    const Trip = sequelize.define('Trip', {
        name: DataTypes.STRING
    })
    return Trip
}
