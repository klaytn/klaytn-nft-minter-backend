const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE,
		process.env.DB_USERNAME,
		process.env.DB_PASSWORD,
		{
host: 'localhost',
define:{
	charset:'utf8',
	collate:'utf8_general_ci',
},
dialect: 'mariadb'
});

const { NFT } = require('./nft')(sequelize)

const DB = {
  sequelize,
  NFT,
}

if(process.env.SYNC_DB == '1')  {
	sequelize.sync({alter:true}).then(function() {
		console.log("All models were synchronized successfully.");
	});
}

module.exports = {DB};