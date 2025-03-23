const {Sequelize} = require('sequelize');
const sequelizeTransforms = require('sequelize-transforms')
const util = require('util')

const db = {};

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'conkart',
    username: 'dev_user',
    password: 'password',
    host: 'localhost',
    port: 3306,
});

sequelizeTransforms(sequelize)

sequelize.authenticate().then(() => {
    console.log(util.format('My SQL Database Connection is established Successfully.'))
}).catch((error) => {
    console.log(util.format('Error While Connecting To the My SQL Database. Error: %j', error))
})

// sequelize.sync({force: true}).then(
//     () => {
//         console.log(util.format('SQL Tables Synced Successfully.'))
//     }
// ).catch((error) => {
//     console.log("sync catch, error: ", error)
//     console.log(util.format('Error While Syncing My SQL Tables. Error: %j', error))
// });

console.log('All models were synchronized successfully.');

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
