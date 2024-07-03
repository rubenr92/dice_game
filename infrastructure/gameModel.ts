const {DataTypes, Model} = require('sequelize')


class Jugada extends Model {
  /*static async roll(valor1:Number, valor2:Number, res:any, id:any){
      //const dado1 = Math.floor(Math.random() * 6) + 1
      //const dado2 = Math.floor(Math.random() * 6) + 1
      //const res = (dado1 + dado2) == 7 ? 1:0
      console.log(valor1,valor2)
      await this.create({dado1:valor1, dado2:valor2, resultado:res, idJugador:id})

  }*/

  static async playergames(playerId:any){ //buscar por nombre?

      const resultadoQuery = await this.findAll({
              attributes:['dado1', 'dado2', 'resultado'],     
              where:{idJugador:playerId}})

      const porcentajeVictorias = resultadoQuery.reduce((acumulador:Number, valorActual:any)=>{return acumulador + valorActual.toJSON()['resultado']},0) /
                                  resultadoQuery.length * 100
                                                      
      console.log(porcentajeVictorias)
      return resultadoQuery
    }
  
    static async deleteGames(playerId:any){
      await this.destroy({where:{idJugador:playerId}})
    }
  
    static async ranking(limit=null, ord='DESC'){

      const order = [['partidasGanadas', ord]]

      let resultadoQuery = await  this.findAll({
          attributes:['idJugador', [sequelize.fn('COUNT', (sequelize.col('resultado'))),'partidasJugadas'],
                      [sequelize.fn('SUM', (sequelize.col('resultado'))),'partidasGanadas']], 
          group:'idJugador',
          limit: limit,
          order:order})

      resultadoQuery = resultadoQuery.map(
          (model:any)=>{const output = model.toJSON();
                      output['porcentajeVictorias'] = output['partidasGanadas'] / output['partidasJugadas'] * 100
                      return output })
                      console.log(resultadoQuery)
      return resultadoQuery
    }
}
/*const gameModel = {
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

}*/

export {gameModel}