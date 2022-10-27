const models = require("../models");
const {throwException} = require("../global/helpers");

async function getService(id) {
  const service = await models.Service.findByPk(id);
  if(!service) {
    throwException("E004");
  }
  return await service;
}

async function getPagedService(offset, limit) {
  const {count : total, rows} = await models.Service.findAndCountAll({
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

async function getAllService() {
  return await models.Service.findAll();
}

async function createService(data) {
  return await models.Service.create(data);
}

async function updateService(id, data) {
  const service = await models.Service.findByPk(id);
  if(!service) {
    throwException("E004");
  }
  return await service.update(data);
}

async function destroyService(id) {
  const service = await models.Service.findByPk(id);
  if(!service) {
    throwException("E004");
  }
  return await service.destroy();
}

module.exports = {
  getService,
  getAllService,
  getPagedService,
  createService,
  updateService,
  destroyService
}