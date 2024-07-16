import { GameModel, modelAttributes } from "./gameModel";
import { PlayerModel, playerAttributes } from "./playerModel";
import {Sequelize} from 'sequelize'


export class DbConnection{
    connection:any
    constructor(uri:string){
        this.connection = new Sequelize(uri)
        GameModel.init(modelAttributes,{sequelize:this.connection, modelName:'Jugada'})
        PlayerModel.init(playerAttributes, {sequelize:this.connection, modelName:'players', timestamps:false})
    }
    async restartdb(){
        await this.connection.sync({ force: true });
    }
    async test(){
        try {
            await this.connection.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
    models(){
        return this.connection.models
    }
}

/*async function f(){
    const mysqlConnection = new DbConnection('mysql://root:1234@localhost:3306/dados')
    await mysqlConnection.test()
    await mysqlConnection.restartdb()
    await mysqlConnection.models().Jugada.saveGame({roll1:2,roll2:3, result:0, playerId:'Ruben'})
    await mysqlConnection.models().Jugada.saveGame({roll1:2,roll2:5, result:1, playerId:'Ruben'})
    await mysqlConnection.models().Jugada.saveGame({roll1:3,roll2:4, result:1, playerId:'Ruben'})
    await mysqlConnection.models().Jugada.saveGame({roll1:2,roll2:3, result:0, playerId:'Carlos'})
    await mysqlConnection.models().Jugada.saveGame({roll1:2,roll2:5, result:1, playerId:'Carlos'})
    await mysqlConnection.models().Jugada.saveGame({roll1:3,roll2:2, result:0, playerId:'Carlos'})
    await mysqlConnection.models().Jugada.updatePlayer('Carlos', 'David')
    const r2 = await mysqlConnection.models().Jugada.ranking()
    const r = await mysqlConnection.models().Jugada.playerGames('Ruben')
    console.log(r)
    console.log(r2)
}
f()*/

/*async function g(){
    const mysqlConnection = new DbConnection('mysql://root:1234@localhost:3306/dados')
    //await mysqlConnection.test()
    await mysqlConnection.restartdb()
    await mysqlConnection.models().players.save('Ruben')
    await mysqlConnection.models().players.save('David')
    //await mysqlConnection.models().players.update('David','Carlos')
    //const p1 = await mysqlConnection.models().players.getPlayer('Ruben')
    //const p2 = await mysqlConnection.models().players.getPlayer('Carlos')
    //const p = await mysqlConnection.models().players.getPlayers()
    //console.log(p)

}
g()*/