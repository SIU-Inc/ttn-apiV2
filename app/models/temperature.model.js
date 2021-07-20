module.exports = (sequelize, Sequelize) => {
    const Temperature = sequelize.define("temperature", {
        counter: {
            type: Sequelize.BIGINT(20)
        },
        time: {
            type: Sequelize.STRING
        },
        frequency: {
            type: Sequelize.FLOAT
        },
        temperature : {
            type: Sequelize.FLOAT
        },
        humidity: {
            type: Sequelize.FLOAT
        },
        gateways: {
            type: Sequelize.TEXT
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        }
    });

    return Temperature;
}