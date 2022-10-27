const models = require("../models");
const { saveFile } = require("../global/fileSystem");

async function getAllHeadquarter(offset, limit) {
  return await models.Headquarter.findAll();
}

async function getHeadquarter(id) {
	return await models.Headquarter.findByPk(id);
}

async function createHeadquarter(data, img) {
	await models.sequelize.transaction(async transaction=>{
		if (img)
			data.urlImage = saveFile(img.path, "headquarter");
		await models.Headquarter.create(data, {transaction});
	})
}

async function updateHeadquarter(id, data, img) {
	await models.sequelize.transaction(async transaction=>{
		if(img)
      data.urlImage = saveFile(img.path,"headquarter");
    let Headquarter = await models.Headquarter.findByPk(id, {transaction});
    await Headquarter.update(data,{transaction});
	})
}

module.exports = {
	getAllHeadquarter,
	getHeadquarter,
	updateHeadquarter,
	createHeadquarter
}