const {DataTypes} = require('sequelize')

const playerModel = {
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    
      registerDate: {
        type:DataTypes.INTEGER,
        defaultValue: DataTypes.NOW,
      }
}