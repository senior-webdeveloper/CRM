const models = require("../models");
const { throwException } = require("../global/helpers");

async function getUnit(id) {
  const unit = await models.Unit.findByPk(id);
  if (!unit) {
    throwException("E004");
  }
  return await unit;
}

async function getPagedUnit(offset, limit) {
  const { count: total, rows } = await models.Unit.findAndCountAll({
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

async function getAllUnit() {
  return await models.Unit.findAll({
    order: [["name", "ASC"]],
  });
}

async function createUnit(data) {
  return await models.Unit.create(data);
}

async function updateUnit(id, data) {
  const unit = await models.Unit.findByPk(id);
  if (!unit) {
    throwException("E004");
  }
  return await unit.update(data);
}

async function destroyUnit(id) {
  const unit = await models.Unit.findByPk(id);
  if (!unit) {
    throwException("E004");
  }
  return await unit.destroy();
}

module.exports = {
  getUnit,
  getAllUnit,
  getPagedUnit,
  createUnit,
  updateUnit,
  destroyUnit,
};
