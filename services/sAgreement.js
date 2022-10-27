const models = require("../models");
const {throwException} = require("../global/helpers");

async function getAgreement(id) {
  const agreement = await models.Agreement.findOne({
    where: {id},
    include: [
      { model: models.PriceList, required: false }
    ]
  });
  if(!agreement) {
    throwException("E002");
  }
  return await agreement;
}

async function getPagedAgreement(offset, limit) {
  const {count : total, rows} = await models.Agreement.findAndCountAll({
    offset,
    limit
  });
  
  const result = {
    total,
    rows,
    count: rows.length
  }
  
  return result
}

async function getAllAgreement() {
  return await models.Agreement.findAll(); 
}

async function createAgreement(data) {
  await models.sequelize.transaction(async transaction => {
    const agreement = await models.Agreement.create(data, { transaction });
    await models.PriceList.create({name: "Lista general", AgreementId: agreement.id}, { transaction });
    await models.PriceList.create({name: "Lista preferencial", AgreementId: agreement.id}, { transaction });
    return agreement;
  });
}

async function updateAgreement(id, data) {
  const agreement = await models.Agreement.findByPk(id);
  if(!agreement) {
    throwException("E002");
  }
  return await agreement.update(data);
}

async function destroyAgreement(id) {
  /*
  const agreement = await models.Agreement.findByPk(id);
  if(!agreement) {
    throwException("E002");
  }
  return await agreement.destroy();
  */
}

module.exports = {
  getAgreement,
  getAllAgreement,
  getPagedAgreement,
  createAgreement,
  updateAgreement,
  destroyAgreement
}