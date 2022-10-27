const models = require("../models");

async function getAllTypeAgreement(offset, limit) {
  return await models.TypeAgreement.findAll();
}

module.exports = {
	getAllTypeAgreement
}