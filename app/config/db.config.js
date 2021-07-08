const databaseInfo = {
  HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "ttn_api",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

const TTNOptions = {
  appID: 'temp-sensor-uca',
  accessKey: 'ttn-account-v2.fBqUst-tH9lEQGGW2j_lGNO14IYT2QHh-XR9Gdum4cs'
} 

module.exports = {databaseInfo: databaseInfo, TTNOptions: TTNOptions};

