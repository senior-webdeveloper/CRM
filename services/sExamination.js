const models = require("../models");
const { throwException } = require("../global/helpers");
const { Op } = require("../global/helpers");
const e = require("express");

async function getExamination(id) {
  const examination = await models.Examination.findByPk(id, {
    nest: true,
    include: [
      {
        model: models.ExaminationGroup,
        as: "examinationGroups",
        // include: [
        //   {
        //     association: models.ExaminationGroup.ExaminationValues,
        //     as: "examinationValues",
        //     include: [
        //       {
        //         association: models.ExaminationValue.ExaminationReferenceValues,
        //         as: "examinationReferenceValues",
        //       },
        //     ],
        //   },
        // ],
      },
      {
        model: models.Service,
      },
    ],
  });
  if (!examination) {
    throwException("E013");
  }
  console.log(examination.toJSON());
  return examination;
}

async function getPagedExamination(offset, limit) {
  const { count: total, rows } = await models.Examination.findAndCountAll({
    nest: true,
    include: [
      {
        model: models.ExaminationGroup,
        as: "examinationGroups",
      },
      {
        model: models.Service,
      },
    ],
    offset,
    limit,
    distinct: true,
  });

  const result = {
    total,
    rows,
    count: rows.length,
  };

  return result;
}

async function getFilterExamination(query) {
  const where = buildQuery(query);
  const { count: total, rows } = await models.Examination.findAndCountAll({
    where,
    nest: true,
    include: [
      {
        model: models.ExaminationGroup,
        as: "examinationGroups",
      },
      {
        model: models.Service,
      },
    ],
    offset: 0,
    limit: 10,
    distinct: true,
  });

  const result = {
    total,
    rows,
    count: rows.length,
  };

  return result;
}

function buildQuery(query) {
  let where = {};

  // filter OR
  if (query.string) {
    where = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.string}%` } },
        { code: query.string.toUpperCase() },
      ],
    };
  }

  // filter AND
  if (query.service && query.service !== "") {
    where["ServiceId"] = query.service;
  }
  if (query.method && query.method !== "") {
    where["MethodId"] = query.method;
  }
  if (query.name) {
    where["name"] = { [Op.iLike]: `%${query.name}%` };
  }
  if (query.code) {
    where["code"] = query.code.toUpperCase();
  }

  return where;
}

async function getAllExamination() {
  return await models.Examination.findAll({
    nest: true,
    include: [
      {
        model: models.ExaminationGroup,
        as: "examinationGroups",
      },
      {
        model: models.Service,
      },
    ],
  });
}

async function createExamination(data) {
  return models.Examination.create(data, {
    include: [
      {
        association: models.Examination.ExaminationGroups,
        as: "examinationGroups",
        include: [
          {
            association: models.ExaminationGroup.ExaminationValues,
            as: "examinationValues",
            include: [
              {
                association: models.ExaminationValue.ExaminationReferenceValues,
                as: "examinationReferenceValues",
              },
            ],
          },
        ],
      },
    ],
  });
}

async function updateExamination(id, { data, metaData }) {
  switch (metaData.modelName) {
    case "examGroup":
      if (metaData.action === "create") {
        return models.ExaminationGroup.create({
          ...data,
          ExaminationId: metaData.relationId,
        });
      } else models.ExaminationGroup.destroy({ where: { id: data.id } });

    case "examValue":
      if (metaData.action === "create") {
        return models.ExaminationValue.create({
          name: data.name,
          UnitId: data.unit.id,
          ExaminationGroupId: data.examGroup.id,
          MethodId: data.methodology.id,
        });
      } else models.ExaminationValue.destroy({ where: { id: data.id } });

    case "examRef":
      if (metaData.action === "create") {
        return models.ExaminationReferenceValue.create({
          name: data.name,
          ExaminationValueId: data.examValue.id,
        });
      } else
        models.ExaminationReferenceValue.destroy({ where: { id: data.id } });

    default:
      const examination = await getExamination(id);
      return examination.update(data);
  }
}

async function destroyExamination(id) {
  const examination = await getExamination(id);
  await examination.update({ status: "E" });
}

module.exports = {
  getExamination,
  getAllExamination,
  getPagedExamination,
  getFilterExamination,
  createExamination,
  updateExamination,
  destroyExamination,
};

// async function createExamination(data) {
//   await models.sequelize.transaction(async (transaction) => {
//     const exam = await models.Examination.create(data, { transaction });
//     // if(data.referenceValues)
//     //   for(let referenceValue of data.referenceValues)
//     //     await exam.addReferenceValue(referenceValue.id,
//     //     { through: referenceValue, transaction })

//     // if (data.examinationGroup) {
//     //   for (let examinationGroup of data.examinationGroup) {
//     //     const examGroup = await models.ExaminationGroup.create(
//     //       examinationGroup,
//     //       {
//     //         transaction,
//     //       }
//     //     );
//     //     await exam.addExaminationGroup(examGroup, {
//     //       transaction,
//     //     });
//     //     const examValuesData = data.examinationValues.filter(
//     //       (val) => val.examGroupId == examinationGroup.id
//     //     );
//     //     examValuesData.forEach(async (value) => {
//     //       const examValue = await models.ExaminationValue.create(value, {
//     //         transaction,
//     //       });
//     //       await examGroup.addExaminationValue(examValue, { transaction });

//     //       const examReferenceValueData = data.ReferenceValue.filter(
//     //         (val) => val.examValueId == examValue.id
//     //       );

//     //       examReferenceValueData.forEach(async (examRefVal) => {
//     //         const examRef = await models.ExaminationReferenceValue.create(
//     //           examRefVal,
//     //           {
//     //             transaction,
//     //           }
//     //         );
//     //         await examValue.addExaminationReferenceValue(examRef, {
//     //           transaction,
//     //         });
//     //       });
//     //     });
//     //   }
//     // }
//   });
// }

// const dd = await models.Examination.build(
//   { id, ...data },
//   {
//     isNewRecord: false,
//     include: [
//       {
//         association: models.Examination.ExaminationGroups,
//         as: "examinationGroups",
//         include: [
//           {
//             association: models.ExaminationGroup.ExaminationValues,
//             as: "examinationValues",
//             include: [
//               {
//                 association:
//                   models.ExaminationValue.ExaminationReferenceValues,
//                 as: "examinationReferenceValues",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   }
// );
