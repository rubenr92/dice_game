import { gameInterface } from "../domain/gameInterface"

const {DataTypes, Model, Sequelize} = require('sequelize')
//const sequelize = new Sequelize({dialect: 'mysql', host:'localhost', port:'3306', username:'root', password:'1234', database:'dados'})

class GameModel extends Model {

  static async saveGame(game:gameInterface){
    await this.create(game)
  }

  static async playerGames(playerId:any){

      let queryResult = await this.findAll({
              attributes:['roll1', 'roll2', 'result'],     
              where:{playerId:playerId}})

      const winningPercentage = queryResult.reduce((acumulador:Number, valorActual:any)=>{return acumulador + valorActual.toJSON()['result']},0) /
                                  queryResult.length * 100
      
      queryResult = queryResult.map((elem:any)=>elem.toJSON())
      return {games:queryResult, winningPercentage:winningPercentage.toFixed(2)}
    }
  
    static async deleteGames(playerId:any){
      await this.destroy({where:{idJugador:playerId}})
    }

    static async updatePlayer(playerId:string, newId:string){
      await this.update({playerId:newId},{where:{playerId:playerId}})
    }
  
    static async ranking(){

      const [result, metadata] = await this.sequelize.query(
                `SELECT playerId, played_games, won_games, (won_games/played_games) * 100 AS winning_percentage 
                    FROM (SELECT playerId, COUNT(result) AS played_games, SUM(result) AS won_games FROM ${this.getTableName()} GROUP BY playerId) 
                    AS statistics ORDER BY winning_percentage DESC`)
      return result
    }
}

const modelAttributes = 
  {id: {
    type: DataTypes.INTEGER,
    unsigned: true,
    autoIncrement: true,
    primaryKey: true,
  },

  roll1: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },

  roll2: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },

  result: {
    type: DataTypes.INTEGER
  },

  playerId: DataTypes.STRING(20),
}


/*async function t(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
t()

async function f(){
  await sequelize.sync({ force: true });
}

async function g(){
  await Jugada.saveGame({roll1:2,roll2:3, result:0, playerId:'Ruben'})
  await Jugada.saveGame({roll1:2,roll2:5, result:1, playerId:'Ruben'})
  await Jugada.saveGame({roll1:3,roll2:4, result:1, playerId:'Ruben'})
  await Jugada.saveGame({roll1:2,roll2:3, result:0, playerId:'Carlos'})
  await Jugada.saveGame({roll1:2,roll2:5, result:1, playerId:'Carlos'})
  await Jugada.saveGame({roll1:3,roll2:2, result:0, playerId:'Carlos'})
  await Jugada.updatePlayer('Carlos', 'David')
  const r = await Jugada.playerGames('Ruben')
  const r2 = await Jugada.ranking()
  console.log(r)
  console.log(r2)
}

setTimeout(f, 3000)
setTimeout(g,5000)

*/
export {GameModel, modelAttributes}