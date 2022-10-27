const models = require("../models");
const messages = require("../config/properties/messages");
const {throwException} = require("../global/helpers");

async function getRole(role_id) {
  const role = models.Role.findOne({
    where: { id: role_id },
    include: [{
      model: models.Function
    }],
    order: [
      ['id','asc'],
      [models.Function,'id','asc']
    ]
  });
  if(!role) {
    throwException('E006')
  }
  return await role;
}

async function getPagedRole(offset, limit) {
  const {count : total, rows} = await models.Role.findAndCountAll({ 
    where: { status: "A" },
    include: [{
      model: models.Function
    }],
    order: [
      ['id','asc'],
      [models.Function,'id','asc']
    ],
    offset,
    limit,
    distinct: true
  });
  
  const result = {
    total,
    rows,
    count: rows.length
  }
  
  return result
}

async function getAllRole() {
  return await models.Role.findAll();
}

async function createRole(data) {
  await models.sequelize.transaction(async transaction=>{
    const role = await models.Role.create(data, {transaction});
    await role.setFunctions(data.functions, {transaction});
  });
}

async function updateRole(role_id, data) {
  await models.sequelize.transaction(async transaction=>{
    const role = await getRole(role_id);
    if (data.functions)
      await role.setFunctions(data.functions, {transaction});
    await role.update(data, {transaction});
  });
}

async function destroyRole(role_id) {
  const role = await models.Role.findByPk(role_id);
  if(!role) {
    throwException('E003')
  }
  return await role.update({ status: 'E' });
}

async function getFunctionsForRole(id) {
  let role = await models.Role.findByPk(id)
  if(!role)
    throwException('E006');
  let functions = await role.getFunctions();
  if(!functions || !functions.length)
    throwException('E008');
    
  return functions;
}

module.exports = {
  getRole,
  getAllRole,
  getPagedRole,
  createRole,
  updateRole,
  destroyRole,
  getFunctionsForRole
}