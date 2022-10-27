const models = require("../models");


async function getRegionsAll() {
  return await models.Region.findAll()
}

async function getProvincesForRegion(id) {
  const region = await models.Region.findByPk(id)
  const provinces = await region.getProvinces();
  return provinces;
}

module.exports = {
  getRegionsAll,
  getProvincesForRegion
  
}





