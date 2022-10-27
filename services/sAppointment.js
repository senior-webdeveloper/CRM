const models = require("../models");
const { throwException, Op } = require("../global/helpers");
const helper = require("../global/helpers");

async function getAppointmentAll(offset, limit, query = {}) {
  let where = buildQuery(query);

  const { count: total, rows } = await models.Appointment.findAndCountAll({
    where,
    include: [
      { model: models.Client, include: models.User },
      { model: models.PriceList },
      { model: models.Headquarter },
    ],
    order: [["id", "asc"]],
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

async function getAppointmentResults(AppointmentId) {
  let servicesQuery = await models.Service.findAll({
    include: [
      {
        model: models.Examination,
        separate: true,
        include: [
          {
            model: models.Appointment,
            where: { id: AppointmentId },
            include: [
              {
                model: models.Employee,
                as: "Responsible",
                required: false,
                include: [{ model: models.Speciality }],
              },
            ],
          },
          {
            model: models.ExaminationGroup,
            as: "examinationGroups",
            include: [
              {
                model: models.ExaminationValue,
                as: "examinationValues",
                include: [
                  {
                    model: models.Unit,
                  },
                  {
                    model: models.Method,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    order: [["id", "asc"]],
  });

  let services = [];
  //This is necessary, because with "separate: true"
  //the query brings back all services, even without examinations
  //and "required: true" doesn't work because there are two queries separate
  for (let service of servicesQuery) {
    service = service.toJSON();

    if (service.Examinations.length) {
      const result = [];

      for (let i = 0; i < service.Examinations.length; i++) {
        const ex = service.Examinations[i];
        const appointmentDetailId = ex.Appointments[0].AppointmentDetail.id;
        let resultData = await models.ExaminationDetail.findAll({
          where: {
            AppointmentDetailId: appointmentDetailId,
          },
        });
        for (let j = 0; j < ex.examinationGroups.length; j++) {
          const eG = ex.examinationGroups[j];

          const dataRows = [];
          for (let k = 0; k < eG.examinationValues.length; k++) {
            const eV = eG.examinationValues[k];

            const refVal = await models.ExaminationReferenceValue.findAll({
              where: { ExaminationValueId: eV.id },
            });

            const r = resultData.find((rs) => rs.ExaminationValueId === eV.id);

            const result = r ? r.value : "not available";

            const dataRow = {
              examValue: eV.name,
              method: eV.Method.name,
              unit: eV.Unit.name,
              result,
              refValue: refVal.map((eRV) => eRV.name).join("\n"),
            };
            service.Examinations[i].examinationGroups[j].examinationValues[k][
              "result"
            ] = dataRow.result;

            dataRows.push(dataRow);
          }
          result.push({ examGroup: eG.name, dataRows });
        }
      }

      services.push({
        ...service,
        result,
      });
    }
  }

  return { rows: services };
}

async function getExamValueResult(appointmentDetailId) {
  let result = models.ExaminationDetail.findAll({
    where: {
      AppointmentDetailId: appointmentDetailId,
    },
  });

  return result;
}

async function getAppointment(id) {
  // console.log("asdljasdnsadkjasdkjads");
  let Appointment = await models.Appointment.findOne({
    where: {
      id,
      status: {
        [Op.ne]: "D",
      },
    },
    include: [
      { model: models.Client, include: models.User },
      { model: models.PriceList, include: [{ model: models.Agreement }] },
      { model: models.Headquarter },
    ],
    order: [["id", "asc"]],
  });

  if (!Appointment) throwException("E018");

  return Appointment;
}

function buildQuery(query) {
  let where = {
    status: {
      [Op.ne]: "D",
    },
  };
  if (query.status) {
    where["status"] = query.status;
  }
  if (query.UserId) {
    where["$Client.UserId$"] = query.UserId;
  }
  if (query.code) {
    where["code"] = { [Op.iLike]: `%${query.code}%` };
  }
  if (query.dni) {
    where["$Client.dni$"] = query.dni;
  }
  if (query.passport) {
    where["$Client.dni$"] = query.passport;
    where["$Client.TypeDocId$"] = 2;
  }
  if (query.date) {
    where["dateAppointment"] = query.date;
  }

  return where;
}

async function addAppointment(data) {
  await models.sequelize.transaction(async (transaction) => {
    const appointment = await models.Appointment.create(data, { transaction });
    if (data.examinations)
      await appointment.setExaminations(data.examinations, { transaction });
    return appointment;
  });
}

async function updateAppointment(id, data) {
  await models.sequelize.transaction(async (transaction) => {
    let appointment = await getAppointment(id);
    if (data.examinations)
      await appointment.setExaminations(data.examinations, { transaction });
    await appointment.update(data, { transaction });
  });
}

async function deleteAppointment(id) {
  let Appointment = await getAppointment(id);
  Appointment.update({ status: "D" });
}

/*
examinations: [{
  id: 1
  observation: "",
  referenceValues:[{
    "id": 2,
    "value": 1000
  },...]
},...]
*/
async function attendAppointment(AppointmentId, data) {
  await models.sequelize.transaction(async (transaction) => {
    for (let ex of data.examinations) {
      let appointmentDetail = await models.AppointmentDetail.findOne({
        where: { ExaminationId: ex.id, AppointmentId },
        transaction,
      });

      await appointmentDetail.update(
        {
          observation: ex.observation,
        },
        {
          transaction,
        }
      );

      await appointmentDetail.setExaminationValues([], { transaction });
      for (let rV of ex.referenceValues) {
        await appointmentDetail.addExaminationValue(rV.id, {
          through: rV,
          transaction,
        });
      }
    }

    if (data.hasOwnProperty("ResponsibleId"))
      //If it has ResponsibleId, it means all exams has been set
      await models.Appointment.update(
        {
          status: "E",
          ResponsibleId: data.ResponsibleId,
          result: data.result,
        },
        {
          where: { id: AppointmentId },
          transaction,
        }
      );
  });
}

module.exports = {
  getAppointmentAll,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentResults,
  attendAppointment,
  getExamValueResult,
};
