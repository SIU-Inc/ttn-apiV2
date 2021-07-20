const dbConfig = require ("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.databaseInfo.DB, dbConfig.databaseInfo.USER, dbConfig.databaseInfo.PASSWORD, {
  host: dbConfig.databaseInfo.HOST,
  dialect: dbConfig.databaseInfo.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.databaseInfo.pool.max,
    min: dbConfig.databaseInfo.pool.min,
    acquire: dbConfig.databaseInfo.pool.acquire,
    idle: dbConfig.databaseInfo.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.temperature = require("./temperature.model.js")(sequelize, Sequelize);
db.general = require("./general.model.js")(sequelize, Sequelize);

db.general.hasMany(db.temperature, {as: "temperature"});
db.temperature.belongsTo(db.general, {
  foreignKey: {name: "generalId", allowNull: false},
  as: "general",
  onDelete: "cascade",
  hooks: true
});

module.exports = db;