const models = require("../models");
const {throwException} = require("../global/helpers");

async function getSpeciality(id) {
  const speciality = await models.Speciality.findByPk(id);
  if(!speciality) {
    throwException("E005");
  }
  return speciality;
}

async function getPagedSpeciality(offset, limit) {
  const {count : total, rows} = await models.Speciality.findAndCountAll({
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

async function getAllSpeciality() {
  return await models.Speciality.findAll();
}

async function createSpeciality(data) {
  await models.Speciality.create(data);
}

async function updateSpeciality(id, data) {
  const speciality = await getSpeciality(id);
  await speciality.update(data);
}

async function destroySpeciality(id) {
  const speciality = await getSpeciality(id);
  await speciality.destroy();
}

module.exports = {
  getSpeciality,
  getPagedSpeciality,
  createSpeciality,
  updateSpeciality,
  getAllSpeciality,
  destroySpeciality
}