const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTuition(id) {
  const tuition = await models.Tuition.findByPk(id);
  if(!tuition) {
    throwException("E009");
  }
  return tuition;
}

async function getPagedTuition(offset, limit) {
  const {count : total, rows} = await models.Tuition.findAndCountAll({
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

async function getAllTuition() {
  return await models.Tuition.findAll();
}

async function createTuition(data) {
  await models.Tuition.create(data);
}

async function updateTuition(id, data) {
  const tuition = await getTuition(id);
  await tuition.update(data);
}

async function destroyTuition(id) {
  const tuition = await getTuition(id);
  await tuition.destroy();
}

module.exports = {
  getTuition,
  getAllTuition,
  getPagedTuition,
  createTuition,
  updateTuition,
  destroyTuition
}