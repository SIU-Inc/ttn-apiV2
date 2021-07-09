const ttn = require("ttn");
const db = require("../models");
const Temperature = db.temperature;
const config = require("../config/db.config.js");

const appID = config.TTNOptions.appID;
const accessKey = config.TTNOptions.accessKey;

const service = {};


service.addToDataBase = ttn.data(appID, accessKey).then(function (client) {
  let serviceResponse = {
    success: true,
    content: {
      message: "Added to DataBase",
    },
  };
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

      const temperatureSaved = await Temperature.create(temperature1);
      if (!temperatureSaved) {
        serviceResponse = {
          success: false,
          content: {
            error: "Not added to DataBase",
          },
        };
      }
      return serviceResponse;
    }
  });
});

service.findAll = async()  => {
	let serviceResponse = {
		success: true,
		content: {}
	};

  try {
    const allData = await Temperature.findAll();
    serviceResponse.content = {
      allData
    }
    return serviceResponse;
    
  } catch (error){
    throw error;
  }
}

module.exports = service;
