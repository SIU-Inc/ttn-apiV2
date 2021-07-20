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
      const counter = payload.counter;
      const time = payload.metadata.time;
      const frequency = payload.metadata.frequency;
      const temperature = payload.payload_fields.temperature;
      const humidity = payload.payload_fields.humidity;
      const gateways = JSON.stringify(payload.metadata.gateways);
      const latitude = payload.metadata.gateways[0].latitude;
      const longitude = payload.metadata.gateways[0].longitude;

      const temperature1 = {
        counter: counter,
        time: time,
        frequency: frequency,
        temperature: temperature,
        humidity: humidity,
        gateways: gateways,
        generalId: 1,
        latitude: latitude,
        longitude: longitude
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

service.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {},
  };

  try {
    const allData = await Temperature.findAll();
    serviceResponse.content = {
      allData,
    };
    return serviceResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = service;
