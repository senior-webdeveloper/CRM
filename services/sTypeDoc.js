const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeDoc(id) {
  const typeDoc = await models.TypeDoc.findByPk(id);
  if(!typeDoc) {
    throwException("E003");
  }
  return typeDoc;
}

async function getPagedTypeDoc(offset, limit) {
  const {count : total, rows} = await models.TypeDoc.findAndCountAll({
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

async function getAllTypeDoc() {
  return await models.TypeDoc.findAll();
}

async function createTypeDoc(data) {
  await models.TypeDoc.create(data);
}

async function updateTypeDoc(id, data) {
  const typeDoc = await getTypeDoc(id);
  await typeDoc.update(data);
}

async function destroyTypeDoc(id) {
  const typeDoc = await getTypeDoc(id);
  await typeDoc.destroy();
}

module.exports = {
  getTypeDoc,
  getAllTypeDoc,
  getPagedTypeDoc,
  createTypeDoc,
  updateTypeDoc,
  destroyTypeDoc
}