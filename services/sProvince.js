const models = require("../models");

async function getDistrictsForProvince(id) {
  const province = await models.Province.findByPk(id)
  const districts = await province.getDistricts();
  return districts;
}

module.exports = {
  getDistrictsForProvince
  
}





