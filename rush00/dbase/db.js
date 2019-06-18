const Sequelize = require('sequelize');  //the database management tool;
const db = new Sequelize('storedb', 'shopper', 'shoppass', {
  host: '23.91.70.67',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
		},
	firstName: {
	  type: Sequelize.STRING,
	  allowNull: false
	},
	lastName: {
	  type: Sequelize.STRING,
	  allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Product = db.define('products', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
		},
	name: Sequelize.STRING,
	categorie: Sequelize.STRING,
	price : {
		type :Sequelize.FLOAT,
		allowNull: false,
		defaultValue: 0.0,
	}
});

db.sync()
	.then(() => console.log('Database hase been synced'))
	.catch((err) => console.error('Error creating database'))

exports = module.exports = {
	User, Product
}