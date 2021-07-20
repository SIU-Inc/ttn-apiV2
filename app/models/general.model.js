module.exports = (sequelize, Sequelize) => {
    const General = sequelize.define("general", {
        hardware_serial: {
            type: Sequelize.STRING
        },
        port: {
            type: Sequelize.INTEGER
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
        }
    });

    return General;
}