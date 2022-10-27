const models = require("../models");
const {throwException} = require("../global/helpers");

async function getProfession(id) {
  const profession = await models.Profession.findByPk(id);
  if(!profession) {
    throwException("E019");
  }
  return profession;
}

async function getPagedProfession(offset, limit) {
  const {count : total, rows} = await models.Profession.findAndCountAll({
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

async function getAllProfession() {
  return await models.Profession.findAll();
}

async function createProfession(data) {
  await models.Profession.create(data);
}

async function updateProfession(id, data) {
  const profession = await getProfession(id);
  await profession.update(data);
}

async function destroyProfession(id) {
  const profession = await getProfession(id);
  await profession.destroy();
}

module.exports = {
  getProfession,
  getAllProfession,
  getPagedProfession,
  createProfession,
  updateProfession,
  destroyProfession
}