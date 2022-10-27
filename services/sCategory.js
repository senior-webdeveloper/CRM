const models = require("../models");
const {throwException} = require("../global/helpers");

async function getCategory(id) {
  const category = await models.Category.findByPk(id);
  if(!category) {
    throwException("E007");
  }
  return category;
}

async function getAllCategory() {
  return await models.Category.findAll();
}

async function createCategory(data) {
  await models.Category.create(data);
}

async function updateCategory(id, data) {
  const category = await getCategory(id);
  await category.update(data);
}

async function destroyCategory(id) {
  const category = await getCategory(id);
  await category.destroy();
}

module.exports = {
  getCategory,
  getAllCategory,
  createCategory,
  updateCategory,
  destroyCategory
}