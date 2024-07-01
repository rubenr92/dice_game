const {DataTypes} = require('sequelize')

const gameModel = {
    id: {
      type: DataTypes.INTEGER,
      unsigned: true,
      autoIncrement: true,
      primaryKey: true,
    },
  
    dado1: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  
    dado2: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  
    resultado: {
      type: DataTypes.INTEGER
    },
  
    idJugador: DataTypes.STRING(20),

}

export {gameModel}