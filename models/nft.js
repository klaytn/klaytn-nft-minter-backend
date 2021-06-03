const { Model, DataTypes } = require('sequelize')

class NFT extends Model {}

module.exports = (sequelize) => {
  NFT.init({
    id:{
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
    },
    uri:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    creator:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:false,
    }
  },{
    sequelize:sequelize,
    modelName:'nft',
    charset:'utf8',
    collate:'utf8_unicode_ci',
    indexes:[{fields:['creator']}]
  })
  return {NFT}
}