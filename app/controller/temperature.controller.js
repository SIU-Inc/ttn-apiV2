const TemperatureService = require("../services/temperature.service");

const controller = {};

controller.addToDataBase = async(req, res) => {
  try {
    const createRecord = await TemperatureService.addToDataBase();
    if(!createRecord.success){
      return res.status(409).json(createRecord.content);
    }
    res.status(201).json(createRecord.content);

  }catch (error){
    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
}

controller.findAll = async(req, res) => {
  try {
    const tempResponse = await TemperatureService.findAll();
    res.status(200).json(tempResponse.content);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
}
 
module.exports = controller;