const models = require("../models");
const {throwException} = require("../global/helpers");

async function getPriceList(id) {
  const priceList = await models.PriceList.findOne({
    where: {id, status: 'A'},
    include: [
      { model: models.Examination, attributes: ['id', 'name'], 
        through: { 
          attributes: ['price'] 
        },
        required: true
      }
    ]
  });

  if(!priceList) {
    throwException("E020");
  }
  return priceList;
}

// async function getPriceList(id) {
//   const priceList = await models.PriceList.findOne({
//     where: {id, status: 'A'},
//     include: [
//       { model: models.Examination, attributes: ['id', 'name'], 
//         through: { 
//           attributes: ['price'] 
//         },
//         required: false 
//       }
//     ]
//   });
//   if(!priceList) {
//     throwException("E020");
//   }
//   return priceList;
// }
 
async function getPagedPriceList(offset, limit) {
  const {count : total, rows} = await models.PriceList.findAndCountAll({
    include: [
      { model: models.Examination, attributes: ['id', 'name'], 
        through: { 
          attributes: ['price'] 
        } 
      }
    ],
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

async function getAllPriceList(query = {}) {
  let where = buildQuery(query);
  return await models.PriceList.findAll({
    where,
    include: [
      { model: models.Examination, attributes: ['id', 'name'], required: false }
    ]
  });
}

async function createPriceList(data) {
  await models.sequelize.transaction(async transaction => {
    const priceList = await models.PriceList.create(data, {transaction});
    if(data.examinations)
      for(let examination of data.examinations)
        await priceList.addExamination(examination.id, 
        { through: {price:  examination.discountPrice}, transaction });
  })
}

async function updatePriceList(id, data) {
  await models.sequelize.transaction(async transaction => {
    const priceList = await getPriceList(id);
    await priceList.update(data);
    if (data.examinations) {
      await priceList.setExaminations([],{transaction})
      for(let examination of data.examinations)
        await priceList.addExamination(examination.id,
          { through: {price: examination.discountPrice}, transaction });
    }
  })
}

async function destroyPriceList(id) {
  const priceList = await models.PriceList.findByPk(id);
  if(!priceList)
    trowException("E020");
  await priceList.update({status: 'E'});
}

function buildQuery(query) {
  let where = {status: 'A'};

  if (query.agreementId) { where['AgreementId'] = query.agreementId }

  return where;
}

module.exports = {
  getPriceList,
  getAllPriceList,
  getPagedPriceList,
  createPriceList,
  updatePriceList,
  destroyPriceList
}