const models = require("../models");
const { throwException, Op } = require("../global/helpers");
const { saveFile } = require("../global/fileSystem");

async function updateEmployee(UserId, data, digitalSignatureFile) {
  await models.sequelize.transaction(async transaction => {
    const employee = await getEmployeeByUserId(UserId)
    if (data.roles) {
      //Take off the [] if user has many multiple roles
      await employee.User.setRoles([data.roles], { transaction })
    }
    if(digitalSignatureFile){
      const digitalSignatureUrl = saveFile(digitalSignatureFile.path, "digitalSignature");
      data.digitalSignatureUrl = digitalSignatureUrl;
    }
    
    if(!data.Tuition2Id)//Because Tuition2Id is not required, then it could be ""
      delete data.Tuition2Id
    await employee.User.update(data, { transaction })
    await employee.update(data, { transaction });
  });

}

async function destroyEmployee(UserId) {
  await models.sequelize.transaction(async transaction => {
    const employee = await getEmployeeByUserId(UserId)
    await employee.User.update({ status: 'E' }, { transaction })
    await employee.update({ status: 'E' }, { transaction });
  });

}

async function getEmployee(employeeId) {

  const employee = await models.Employee.findOne({
    where: { id: employeeId },
    include: [{
      model: models.User,
      include: [{ model: models.Role }]
    }, {
      model: models.Tuition
    }, {
      model: models.Tuition, as: 'Tuition2'
    }, {
      model: models.Profession
    }, {
      model: models.Category
    }, {
      model: models.Headquarter
    }, {
      model: models.Speciality
    }, {
      model: models.TypeEmployee
    }, {
      model: models.TypeDoc
    }, {
      model: models.District,
      include: [{ model: models.Province, include: [{ model: models.Region }] }]
    }, ],
  });

  if (!employee) {
    throwException("E001");
  }
  return employee;
}

async function getEmployeeByUserId(UserId) {
  const employee = await models.Employee.findOne({
    where: { UserId, status: "A" },
    include: [{ model: models.User }]
  });
  if (!employee) {
    throwException("E001");
  }
  return employee;
}

async function getEmployeeByTypeEmployeeId(TypeEmployeeId) {
  return await models.Employee.findAll({ 
    where: {TypeEmployeeId}, 
    include: [{ model: models.TypeEmployee }]
  });
}

async function getAllEmployee(query = {}) {
  let where = buildQuery(query);
  return await models.Employee.findAll({ where });
}

async function getPagedEmployee(offset, limit, query = {}) {
  let where = buildQuery(query);

  const { count: total, rows } = await models.Employee.findAndCountAll({
    where,
    include: [{
      model: models.User,
      include: [{ model: models.Role }]
    }, {
      model: models.Tuition
    }, {
      model: models.Tuition, as: 'Tuition2'
    }, {
      model: models.Profession
    }, {
      model: models.Category
    }, {
      model: models.Headquarter
    }, {
      model: models.Speciality
    }, {
      model: models.TypeEmployee
    }, {
      model: models.TypeDoc
    }, {
      model: models.District,
      include: [{ model: models.Province, include: [{ model: models.Region }] }]
    }, ],
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

function buildQuery(query) {
  let where = { };

  if (query.fullname) { where = { [Op.or]: [
      {
        name: { [Op.iLike]: `%${query.fullname}%` }
      },
      {
        lastNameP: { [Op.iLike]: `%${query.fullname}%` }
      },
      {
        lastNameM: { [Op.iLike]: `%${query.fullname}%` }
      },
    ]};
  }

  if (query.dni) { where['dni'] = query.dni };
  if (query.passport) { 
    where['dni'] = query.passport 
    where['TypeDocId'] = 2 
  };
  
  if(query.SpecialityId) {
    where['SpecialityId'] = query.SpecialityId
  }

  return where;
}



module.exports = {
  updateEmployee,
  destroyEmployee,
  getEmployee,
  getPagedEmployee,
  getEmployeeByTypeEmployeeId,
  getAllEmployee
}
