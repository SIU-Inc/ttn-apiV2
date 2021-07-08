module.exports = (sequelize, Sequelize) => {
    const Temperature = sequelize.define("temperature", {
        hardware_serial: {
            type: Sequelize.STRING
        },
        port: {
            type: Sequelize.INTEGER
        },
        counter: {
            type: Sequelize.BIGINT(20)
        },
        time: {
            type: Sequelize.STRING
        },
        frequency: {
            type: Sequelize.FLOAT
        },
        modulation: {
            type: Sequelize.STRING
        },
        data_rate: {
            type: Sequelize.STRING
        },
        coding_rate: {
            type: Sequelize.STRING
        },
        airtime: {
            type: Sequelize.INTEGER
        },
        temperature : {
            type: Sequelize.FLOAT
        },
        humidity: {
            type: Sequelize.FLOAT
        }
    });

    return Temperature;
}