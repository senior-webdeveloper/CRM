const models = require("../models");



async function getAllReferers() {
  return await models.Referers.findAll();
}



async function addReferer(data) {
  await models.sequelize.transaction(async (transaction) => {
    const referer = await models.Referers.create(data, { transaction });

    return referer;
  });
}




module.exports = {
  getAllReferers,
  addReferer
};
