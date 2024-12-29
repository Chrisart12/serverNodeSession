// require('dotenv').config()
const { database }   = require('../config/dbConfig')
const { Sequelize, DataTypes } = require('sequelize');
console.log('database', database)
const sequelize = new Sequelize(database.database, database.username, database.password, { // database, username, password
    host: database.host,
    port: database.port,
    dialect: database.dialect
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.products.hasMany(db.reviews)

db.reviews.belongsTo(db.products)


db.sequelize.sync({ alter: false, force: false })

.then(() => {
    console.log('Yes re-sync done!')
})

module.exports = db

