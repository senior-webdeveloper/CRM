const models = require("../models");
const sFunction = require("./sFunction");
const { throwException } = require("../global/helpers");
const { saveFile } = require("../global/fileSystem");

// For generate random password
var generator = require("generate-password");
const { sendPassword } = require("../global/mailer");

async function createUser(data) {
  return await models.User.create({
    username: data.username,
    password: generator
      .generate({ length: 8, numbers: true, excludeSimilarCharacters: true })
      .toLocaleUpperCase(),
  });
}

async function createUserClient(data) {
  const persistedClient = await models.sequelize.transaction(
    async (transaction) => {
      data.password = data.dni;
      data.username = data.username.toLowerCase();
      const user = await models.User.create(data, { transaction });
      const client = await models.Client.create(data, { transaction });
      await user.setClient(client, { transaction });
      await user.setRoles([3], { transaction });
      sendPassword(data);
      return client;
    }
  );

  return persistedClient;
}

async function createUserEmployee(data, digitalSignatureFile) {
  const persistedEmployee = await models.sequelize.transaction(
    async (transaction) => {
      data.password = generator
        .generate({ length: 8, numbers: true, excludeSimilarCharacters: true })
        .toLocaleUpperCase();
      data.username = data.username.toLowerCase();
      const user = await models.User.create(data, { transaction });
      if (digitalSignatureFile) {
        const digitalSignatureUrl = saveFile(
          digitalSignatureFile.path,
          "digitalSignature"
        );
        data.digitalSignatureUrl = digitalSignatureUrl;
      }
      if (!data.Tuition2Id)
        //Because Tuition2Id is not required, then it could be ""
        delete data.Tuition2Id;
      const employee = await models.Employee.create(data, { transaction });
      await user.setEmployee(employee, { transaction });
      //Take off the [] if user has many roles
      await user.setRoles([data.roles], { transaction });
      return employee;
    }
  );

  return persistedEmployee;
}

async function createToken(user) {
  // It can be use for work with hours or min of expiration
  let expiration_date = new Date();

  const token = await models.Token.create({
    hash: generator.generate(),
    UserId: user.id,
    expiration_date,
  });

  return token;
}

async function validToken(hash, userId) {
  const token = await models.Token.findOne({
    where: { hash, status: "A" },
    include: [{ model: models.User }],
  });

  if (!token) throwException("E010");
  // Token has been used
  await token.update({ status: "I" });

  if (token.User.id != userId) throwException("E008");
  else return token;
}

async function assignRoles(data, user_id) {
  const user = await models.User.findByPk(user_id);
  if (!user) throwException("E002");
  else await user.setRoles(data.roles);
}

async function takeOffRole(role_id, user_id) {
  const user = await models.User.findByPk(user_id);
  if (!user) throwException("E002");
  else user.removeRole(role_id);
}

async function getMenuForUser(user_id, typeApp = "I") {
  let function_ids = [];
  let roles = await getRolesByUser(user_id);

  if (!roles || !roles.length) throwException("E012");
  for (let rol of roles) {
    for (let func of rol.Functions) {
      function_ids.push(func.id);
    }
  }

  const functions = await sFunction.getFunctionsByUniqIds(
    function_ids,
    typeApp,
    user_id
  );
  return functions;
}

async function getRolesByUser(user_id) {
  let user = await models.User.findByPk(user_id);
  if (!user) throwException("E002");

  let roles = await user.getRoles({ include: [{ model: models.Function }] });
  return roles;
}

function getUserAll() {
  return models.User.findAll({
    include: [
      {
        model: models.Client,
      },
      {
        model: models.Employee,
      },
    ],
  });
}

async function getUserByCredentials(username, password) {
  const User = await models.User.findOne({
    where: { username: username.toLowerCase(), password },
    include: [
      {
        model: models.Client,
        required: false,
      },
      {
        model: models.Employee,
        include: [
          {
            model: models.Headquarter,
          },
        ],
        required: false,
      },
      {
        model: models.Role,
      },
    ],
  });

  if (!User) throwException("E006");
  else {
    return User;
    /*
    const firstFunction = await getFirstLinkableFunctionByUser(User)
    let objUser = User.toJSON();
    objUser.Function = firstFunction
    return objUser;
    */
  }
}

async function getUserById(user_id) {
  let user = await models.User.findOne({
    where: { id: user_id },
    include: [
      {
        model: models.Client,
        required: false,
      },
      {
        model: models.Employee,
        required: false,
      },
    ],
  });

  if (!user) throwException("E001");

  return user;
}

async function getUserByEmail(email) {
  const user = await models.User.findOne({
    where: { username: email },
  });

  if (!user) throwException("E001");

  return user;
}

async function updateUser(userId, fields) {
  let user = await getUserById(userId);
  const { currentPassword, newPassword } = fields;
  if (currentPassword != user.password) throwException("E016");
  await user.update({ password: newPassword });
}

async function resetPasswordUser(userId, newPassword) {
  const user = await models.User.findByPk(userId);

  if (!user) throwException("E001");

  return await user.update({ password: newPassword });
}

async function getFirstLinkableFunctionByUser(User) {
  const roles = await User.getRoles({
    include: [
      {
        model: models.Function,
        where: { typeApplication: "I" },
      },
    ],
  });
  let function_ids = [];
  for (let rol of roles) {
    for (let func of rol.Functions) {
      function_ids.push(func.id);
    }
  }
  function_ids.sort((a, b) => a - b);
  const firstFunction = await models.Function.findOne({
    where: { id: function_ids[0] },
  });
  console.log(firstFunction.toJSON());
  return firstFunction.toJSON();
}

module.exports = {
  createUser,
  createUserClient,
  createUserEmployee,
  createToken,
  getUserById,
  getUserAll,
  getUserByCredentials,
  getUserByEmail,
  getMenuForUser,
  getRolesByUser,
  assignRoles,
  takeOffRole,
  updateUser,
  validToken,
  resetPasswordUser,
};
