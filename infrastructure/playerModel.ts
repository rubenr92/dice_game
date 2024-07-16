const {DataTypes, Model} = require('sequelize')


class PlayerModel extends Model {
  static async save(name:string){
    await this.create({name:name, registerDate: new Date()})
  }

  static async updateName(name:string, newName:string){
    await this.update({name:newName},{where:{name:name}})
  }

  static async delete(name:string){
    await this.destroy({where:{name:name}})
  }

  static async getPlayer(name:string){
    const result = await this.findAll({where:{name:name}},{attributes:['name','registerDate']})
    return result
  }
  static async getPlayers(){
    const result = await this.findAll({attributes:['name','registerDate']})
    return result
  }
}

const playerAttributes = {
    id: {
      type: DataTypes.INTEGER,
      unsigned: true,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
      },
    
      registerDate: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
}

export {PlayerModel, playerAttributes}
