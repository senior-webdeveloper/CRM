const sUnit = require("../services/sUnit"),
  {
    makeResponseOk,
    makeResponseException,
    makeResponseOkMessage,
  } = require("../global/response");

async function getPagedUnit(req, res) {
  try {
    const range = req.query.range || "[0,9]";
    const [start, end] = JSON.parse(range);
    const limit = end - start + 1;
    const specialities = await sUnit.getPagedUnit(start, limit);
    makeResponseOk(res, { data: specialities }, "global/master");
  } catch (err) {
    makeResponseException(res, err);
  }
}

async function getAllUnit(req, res) {
  try {
    const specialities = await sUnit.getAllUnit();
    makeResponseOk(res, { data: specialities }, "global/masterAll");
  } catch (err) {
    makeResponseException(res, err);
  }
}

async function getUnit(req, res) {
  try {
    let id = req.params.id;
    let service = await sUnit.getUnit(id);
    makeResponseOk(res, { data: service }, "global/masterOne");
  } catch (err) {
    makeResponseException(res, err);
  }
}

async function createUnit(req, res) {
  try {
    await sUnit.createUnit(req.fields);
    makeResponseOkMessage(res, "I050");
  } catch (err) {
    makeResponseException(res, err);
  }
}

async function updateUnit(req, res) {
  try {
    let body = req.fields;
    let id = req.params.id;
    await sUnit.updateUnit(id, body);
    makeResponseOkMessage(res, "I052");
  } catch (err) {
    makeResponseException(res, err);
  }
}

async function deleteUnit(req, res) {
  try {
    let id = req.params.id;
    await sUnit.destroyUnit(id);
    makeResponseOkMessage(res, "I054");
  } catch (err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getAllUnit,
  getPagedUnit,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
};
