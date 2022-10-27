const models = require("../models");
const { throwException } = require("../global/helpers");

async function getMethod(id) {
  const method = await models.Method.findByPk(id);
  if (!method) {
    throwException("E004");
  }
  return await method;
}

async function getPagedMethod(offset, limit) {
  const { count: total, rows } = await models.Method.findAndCountAll({
    offset,
    limit,
  });

  const result = {
    total,
    rows,
    count: rows.length,
  };

  return result;
}

async function getAllMethod() {
  return await models.Method.findAll({
    order: [["name", "ASC"]],
  });
}

async function createMethod(data) {
  return await models.Method.create(data);
}

async function updateMethod(id, data) {
  const method = await models.Method.findByPk(id);
  if (!method) {
    throwException("E004");
  }
  return await method.update(data);
}

async function destroyMethod(id) {
  const method = await models.Method.findByPk(id);
  if (!method) {
    throwException("E004");
  }
  return await method.destroy();
}

module.exports = {
  getMethod,
  getAllMethod,
  getPagedMethod,
  createMethod,
  updateMethod,
  destroyMethod,
};
