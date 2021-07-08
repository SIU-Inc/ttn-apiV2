const ttn = require("ttn");
const moment = require("moment");
const config = require("../config/db.config.js");
const db = require("../models");
const Temperature = db.temperature;

const appID = config.TTNOptions.appID;
const accessKey = config.TTNOptions.accessKey;

db.sequelize.sync();

ttn.data(appID, accessKey).then(function (client) {
  console.log("Si entro");
  client.on("uplink", async function (devID, payload) {
    console.log("Received uplink from", devID);
    if (payload.counter != undefined) {
      const port = payload.port;
      const counter = payload.counter;
      const hardware_serial = payload.hardware_serial;
      const time = payload.metadata.time;
      const frequency = payload.metadata.frequency;
      const modulation = payload.metadata.modulation;
      const data_rate = payload.metadata.data_rate;
      const airtime = payload.metadata.airtime;
      const coding_rate = payload.metadata.coding_rate;
      const temperature = payload.payload_fields.temperature;
      const humidity = payload.payload_fields.humidity;

      const temperature1 = {
        port: port,
        counter: counter,
        hardware_serial: hardware_serial,
        time: time,
        frequency: frequency,
        modulation: modulation,
        data_rate: data_rate,
        airtime: airtime,
        coding_rate: coding_rate,
        temperature: temperature,
        humidity: humidity,
      };

      console.log(temperature1.toString())
      Temperature.create(temperature1)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial.",
          });
        });
    }
  });
});
