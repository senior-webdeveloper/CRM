const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeEmployee(id) {
  const typeEmployee = await models.TypeEmployee.findByPk(id);
  if(!typeEmployee) {
    throwException("E015");
  }
  return typeEmployee;
}

async function getPagedTypeEmployee(offset, limit) {
  const {count : total, rows} = await models.TypeEmployee.findAndCountAll({
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

async function getAllTypeEmployee() {
  return await models.TypeEmployee.findAll();
}

async function createTypeEmployee(data) {
  await models.TypeEmployee.create(data);
}

async function updateTypeEmployee(id, data) {
  const typeEmployee = await getTypeEmployee(id);
  await typeEmployee.update(data);
}

async function destroyTypeEmployee(id) {
  const typeEmployee = await getTypeEmployee(id);
  await typeEmployee.destroy();
}

module.exports = {
  getTypeEmployee,
  getAllTypeEmployee,
  getPagedTypeEmployee,
  createTypeEmployee,
  updateTypeEmployee,
  destroyTypeEmployee
}