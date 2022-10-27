const models = require("../models"),
  { url, port } = require("../config");

const C = require("../config/properties/constants");
const regions = require("../static/regions");
const provinces = require("../static/provinces");
const districts = require("../static/districts");

async function initialization() {
  await models.sequelize.sync({ force: true });

  await models.Region.bulkCreate(regions);
  await models.Province.bulkCreate(provinces);
  await models.District.bulkCreate(districts);

  await models.TypeDoc.bulkCreate([
    {
      name: "DNI",
      description: "Descripción",
    },
    {
      name: "Pasaporte",
      description: "Descripción",
    },
    {
      name: "Otros",
      description: "Descripción",
    },
  ]);

  await models.TypeEmployee.bulkCreate([
    {
      name: "Médico",
      description: "Descripción",
    },
    {
      name: "Secretaria",
      description: "Descripción",
    },
    {
      name: "Administrativo",
      description: "Descripción",
    },
  ]);

  await models.Headquarter.bulkCreate([
    {
      name: "Central",
      address: "Av. Central",
      tlfNumber: "0251",
      urlImage: `${url}:${port}/public/imgs/headquarter/dark-material-bg.jpg`,
    },
    {
      name: "Sede 1",
      address: "Av. Principal",
      tlfNumber: "0251",
      urlImage: `${url}:${port}/public/imgs/headquarter/dark-material-bg.jpg`,
    },
    {
      name: "Sede 2",
      address: "Av. Primaria",
      tlfNumber: "0251",
      urlImage: `${url}:${port}/public/imgs/headquarter/dark-material-bg.jpg`,
    },
  ]);

  await models.Speciality.bulkCreate([
    {
      name: "Médico internista",
      description: "Descripción",
    },
    {
      name: "Patólogo",
      description: "Descripción",
    },
    {
      name: "Tecnólogo médico",
      description: "Descripción",
    },
  ]);

  await models.Category.bulkCreate([
    {
      name: "Categoría 1",
      description: "Descripción",
    },
    {
      name: "Categoría 2",
      description: "Descripción",
    },
    {
      name: "Categoría 3",
      description: "Descripción",
    },
  ]);

  await models.ReferenceValue.bulkCreate([
    {
      name: "glucosa",
      unit: "ml",
    },
    {
      name: "otro",
      unit: "cc",
    },
    {
      name: "ejemplo",
      unit: "%",
    },
    {
      name: "nombre",
      unit: "ml",
    },
    {
      name: "valor",
      unit: "cc",
    },
    {
      name: "referencia",
      unit: "cm",
    },
    {
      name: "otro valor",
      unit: "s",
    },
    {
      name: "otro nombre",
      unit: "ml",
    },
    {
      name: "glucosa 2",
      unit: "ml",
    },
    {
      name: "prueba",
      unit: "ml",
    },
    {
      name: "plaquetas",
      unit: "ml",
    },
    {
      name: "globulos",
      unit: "ml",
    },
  ]);

  await models.TypeAgreement.bulkCreate([
    {
      name: "Natural",
      description: "Descripción",
    },
    {
      name: "Juridica",
      description: "Descripción",
    },
  ]);

  await models.Agreement.bulkCreate([
    {
      name: "Sin convenio",
      description: "Contiene la lista de precios general",
      address: "",
      ruc: "",
      email: "",
      tlfNumber: "",
      TypeAgreement: 1,
    },
    {
      name: "Convenio 1",
      description: "Descripción",
      address: "Direccion",
      ruc: "12",
      email: "email@correo.com",
      tlfNumber: "0251",
      TypeAgreementId: 1,
    },
    {
      name: "Convenio 2",
      description: "Descripción",
      address: "Direccion 2",
      ruc: "13",
      email: "email2@correo.com",
      tlfNumber: "0251",
      TypeAgreementId: 1,
    },
    {
      name: "Convenio 3",
      description: "Descripción",
      address: "Direccion 3",
      ruc: "14",
      email: "email3@correo.com",
      tlfNumber: "0251",
      TypeAgreementId: 2,
    },
  ]);

  await models.PriceList.bulkCreate([
    {
      name: "Lista general",
      AgreementId: 1,
    },
    {
      name: "Lista de precios 1",
      AgreementId: 2,
    },
    {
      name: "Lista de precios 2",
      AgreementId: 2,
    },
    {
      name: "Lista de precios 1",
      AgreementId: 3,
    },
  ]);

  await models.Service.bulkCreate([
    {
      name: "Servicio 1",
      description: "Descripción",
    },
    {
      name: "Servicio 2",
      description: "Descripción",
    },
    {
      name: "Servicio 3",
      description: "Descripción",
    },
  ]);

  await models.Profession.bulkCreate([
    {
      name: "Profesión 1",
      description: "Descripción",
    },
    {
      name: "Profesión 2",
      description: "Descripción",
    },
    {
      name: "Profesión 3",
      description: "Descripción",
    },
  ]);

  await models.Tuition.bulkCreate([
    {
      name: "Colegiatura 1",
      description: "Descripción",
    },
    {
      name: "Colegiatura 2",
      description: "Descripción",
    },
    {
      name: "Colegiatura 3",
      description: "Descripción",
    },
  ]);

  await models.Role.bulkCreate([
    {
      name: "Rol admin",
      description: "Descripción",
    },
    {
      name: "Rol Empleado",
      description: "Descripción",
    },
    // {
    //   name: "Rol Paciente",
    //   description: "Descripción"
    // },
  ]);

  await models.User.bulkCreate([
    {
      username: "jcamacaro@correo.com",
      password: 12345,
    },
    {
      username: "jchiquin@correo.com",
      password: 12345,
    },
    {
      username: "jrosendo@correo.com",
      password: 12345,
    },
    {
      username: "empleado1@correo.com",
      password: 12345,
    },
    {
      username: "empleado2@correo.com",
      password: 12345,
    },
    {
      username: "empleado3@correo.com",
      password: 12345,
    },
    {
      username: "empleado4@correo.com",
      password: 12345,
    },
    {
      username: "empleado5@correo.com",
      password: 12345,
    },
    {
      username: "empleado6@correo.com",
      password: 12345,
    },
  ]);

  let user1 = await models.User.findByPk(1);
  let user2 = await models.User.findByPk(2);
  let user3 = await models.User.findByPk(3);

  await models.Client.bulkCreate([
    {
      UserId: user3.id,
      TypeDocId: 1,
      dni: "8888",
      birthDate: "11/10/1985",
      code: "002",
      name: "Joan",
      lastNameP: "Rosendo",
      lastNameM: "Valera",
      phoneNumber: "0414",
      tlfNumber: "0251",
      DistrictId: "010101",
      gender: "M",
      civilStatus: "M",
      nationality: "Venezolano",
      historyNumber: "H-38293C",
      address: "Caldera",
    },
  ]);

  await models.Employee.bulkCreate([
    {
      TypeDocId: 1,
      ProfessionId: 2,
      HeadquarterId: 1,
      TuitionId: 1,
      Tuition2Id: 2,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 1,
      CategoryId: 1,
      HeadquarterId: 1,
      DistrictId: "250203",
      TypeEmployeeId: 3,
      UserId: user1.id,
      dni: "45224",
      birthDate: "11/10/1998",
      admissionDate: "11/10/2000",
      name: "José",
      lastNameP: "Camacaro",
      lastNameM: "Barraez",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      nationality: "Venezolano",
      address: "Carrera peru",
      profession: "Administrador",
      tuitionNumber: "12312314",
      tuitionNumber2: "11111",
      digitalSignatureUrl: `${url}:${port}/public/documents/digitalSignature/initial_51e229ac96ec75fc57909362fb4222f7.jpg`,
      civilStatus: "M",
    },
    {
      UserId: 4,
      TypeDocId: 1,
      ProfessionId: 1,
      HeadquarterId: 2,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 2,
      CategoryId: 1,
      TypeEmployeeId: 1,
      HeadquarterId: 2,
      DistrictId: "250203",
      dni: "1",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Juan",
      lastNameP: "Perez",
      lastNameM: "Paez",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      digitalSignatureUrl: `${url}:${port}/public/documents/digitalSignature/initial_51e229ac96ec75fc57909362fb4222f7.jpg`,
      civilStatus: "M",
    },
    {
      UserId: 5,
      TypeDocId: 1,
      ProfessionId: 1,
      HeadquarterId: 3,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 2,
      CategoryId: 1,
      HeadquarterId: 3,
      DistrictId: "250203",
      TypeEmployeeId: 1,
      dni: "2",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Carlos",
      lastNameP: "Rodriguez",
      lastNameM: "Mendoza",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      digitalSignatureUrl: `${url}:${port}/public/documents/digitalSignature/initial_51e229ac96ec75fc57909362fb4222f7.jpg`,
      civilStatus: "S",
    },
    {
      UserId: 6,
      TypeDocId: 1,
      ProfessionId: 3,
      HeadquarterId: 2,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 3,
      CategoryId: 1,
      HeadquarterId: 1,
      DistrictId: "050201",
      TypeEmployeeId: 1,
      dni: "3",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Jorge",
      lastNameP: "Chiquín",
      lastNameM: "Valderrama",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      digitalSignatureUrl: `${url}:${port}/public/documents/digitalSignature/initial_51e229ac96ec75fc57909362fb4222f7.jpg`,
      civilStatus: "D",
    },
    {
      UserId: 7,
      TypeDocId: 1,
      ProfessionId: 3,
      HeadquarterId: 1,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 1,
      CategoryId: 1,
      TypeEmployeeId: 1,
      HeadquarterId: 2,
      DistrictId: "050205",
      dni: "4",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Pablo",
      lastNameP: "Pirela",
      lastNameM: "Alvarado",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      digitalSignatureUrl: `${url}:${port}/public/documents/digitalSignature/initial_51e229ac96ec75fc57909362fb4222f7.jpg`,
      civilStatus: "S",
    },
    {
      UserId: 8,
      TypeDocId: 1,
      ProfessionId: 1,
      HeadquarterId: 1,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 3,
      CategoryId: 1,
      TypeEmployeeId: 1,
      HeadquarterId: 2,
      DistrictId: "020201",
      dni: "5",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Maria",
      lastNameP: "Perez",
      lastNameM: "Peraza",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "F",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      civilStatus: "M",
    },
    {
      UserId: 9,
      TypeDocId: 1,
      ProfessionId: 2,
      HeadquarterId: 1,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 3,
      CategoryId: 1,
      TypeEmployeeId: 1,
      HeadquarterId: 1,
      DistrictId: "250203",
      dni: "6",
      birthDate: "11/10/2000",
      admissionDate: "11/10/2000",
      name: "Juan",
      lastNameP: "Guaido",
      lastNameM: "Paez",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      address: "Carrera peru",
      profession: "Médico",
      tuitionNumber: "12312342",
      civilStatus: "M",
    },
    {
      TypeDocId: 1,
      ProfessionId: 2,
      HeadquarterId: 1,
      TuitionId: 1,
      typeDirection: "C",
      referencePoint: "Diagonal a panaderia Perú",
      SpecialityId: 3,
      CategoryId: 1,
      HeadquarterId: 3,
      DistrictId: "250203",
      TypeEmployeeId: 1,
      UserId: user2.id,
      dni: "45244",
      birthDate: "11/10/1998",
      admissionDate: "11/10/2000",
      name: "Jorge",
      lastNameP: "Chiquín",
      lastNameM: "Mendoza",
      phoneNumber: "0414",
      tlfNumber: "0251",
      gender: "M",
      nationality: "Venezolano",
      address: "Carrera peru",
      address: "Carrera peru",
      profession: "Secretaria",
      tuitionNumber: "12312312",
      civilStatus: "M",
    },
  ]);

  await models.Appointment.bulkCreate([
    {
      code: "C01",
      time: "13:00",
      dateAppointment: "2019/01/04",
      totalPrice: 300,
      ClientId: 1,
      PriceListId: 1,
      HeadquarterId: 1,
      ResponsibleId: 2,
      result: "Todo en orden, tomar vitaminas",
      status: "E",
    },
    {
      code: "C02",
      time: "17:00",
      dateAppointment: "2019/20/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      ResponsibleId: 1,
      result: "Realizar más examenes, precaución. Riesgo de cancer.",
      status: "E",
    },
    {
      code: "C03",
      time: "17:00",
      dateAppointment: "2019/21/03",
      totalPrice: 560 + 320,
      ClientId: 1,
      PriceListId: 3,
      HeadquarterId: 2,
      status: "S",
    },
    {
      code: "C04",
      time: "17:00",
      dateAppointment: "2019/20/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      status: "S",
    },
    {
      code: "C05",
      time: "17:00",
      dateAppointment: "2019/20/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      status: "S",
    },
    {
      code: "C06",
      time: "17:00",
      dateAppointment: "2019/21/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      status: "S",
    },
    {
      code: "C07",
      time: "17:00",
      dateAppointment: "2019/10/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      status: "S",
    },
    {
      code: "C08",
      time: "17:00",
      dateAppointment: "2019/10/03",
      totalPrice: 400 + 600 + 800 + 6150.99 + 750.99,
      ClientId: 1,
      PriceListId: 2,
      HeadquarterId: 1,
      status: "S",
    },
  ]);

  await models.Function.bulkCreate([
    { title: "Aplicaciones", type: "group", icon: "apps" },
    {
      title: "Sede",
      type: "item",
      url: "/apps/home",
      icon: "home",
      parent_id: 1,
    },
    {
      title: "Convenios",
      type: "item",
      url: "/apps/agreements",
      icon: "folder_specia",
      parent_id: 1,
    },
    {
      title: "Personal",
      type: "item",
      url: "/apps/employees",
      icon: "supervisor_account",
      parent_id: 1,
    },
    {
      title: "Pacientes",
      type: "item",
      url: "/apps/patients",
      icon: "group",
      parent_id: 1,
    },
    {
      title: "Citas",
      type: "item",
      url: "/apps/appointments",
      icon: "calendar_today",
      parent_id: 1,
    },
    {
      title: "Resultados",
      type: "item",
      url: "/apps/results",
      icon: "poll",
      parent_id: 1,
    },
    {
      title: "Exámenes",
      type: "item",
      url: "/apps/examinations",
      icon: "poll",
      parent_id: 1,
    },
    {
      title: "Mis Resultados",
      type: "item",
      url: "/apps/patientexaminations",
      icon: "calendar_today",
      parent_id: 1,
    },
    {
      title: "Reporte exámenes mensual",
      type: "item",
      url: "/apps/report/exam",
      icon: "calendar_today",
      parent_id: 1,
    },
  ]);

  const fagreement = await models.Function.findByPk(3);
  const fpersonal = await models.Function.findByPk(4);
  const fclient = await models.Function.findByPk(5);
  const fappointment = await models.Function.findByPk(6);
  const fresults = await models.Function.findByPk(7);
  const fexamination = await models.Function.findByPk(8);

  const roleAdmin = await models.Role.findByPk(1);
  const roleEmp = await models.Role.findByPk(2);

  await roleEmp.addFunction(fagreement, { through: { canDelete: false } });
  await roleEmp.addFunction(fpersonal, { through: { canDelete: false } });
  await roleEmp.addFunction(fclient, { through: { canDelete: false } });
  await roleEmp.addFunction(fappointment, { through: { canDelete: false } });
  await roleEmp.addFunction(fresults, { through: { canDelete: false } });
  await roleEmp.addFunction(fexamination, { through: { canDelete: false } });

  await roleAdmin.setFunctions([2, 3, 4, 5, 6, 7, 8, 10]);
  await roleEmp.addFunctions([2, 10]);
  //await roleCli.setFunctions([2, 9]);

  await roleAdmin.setUsers([1]);
  await roleEmp.setUsers([2, 4, 5, 6, 7, 8, 9]);
  //await roleCli.setUsers([3]);

  await models.Examination.bulkCreate([
    {
      name: "Examen 1",
      code: "E01",
      indications: "Indicaciones examen 1",
      ServiceId: 1,
      typeSample: "texto ejemplo",
      volume: "texto ejemplo",
      supplies: "texto ejemplo",
      storageTemperature: "texto ejemplo",
      fastingConditions: "texto ejemplo",
      runFrequency: "texto ejemplo",
      processTime: "texto ejemplo",
      reportTime: "texto ejemplo",
    },
    {
      name: "Examen 2",
      code: "E02",
      indications: "Indicaciones examen 2",
      ServiceId: 2,
      typeSample: "texto ejemplo",
      volume: "texto ejemplo",
      supplies: "texto ejemplo",
      storageTemperature: "texto ejemplo",
      fastingConditions: "texto ejemplo",
      runFrequency: "texto ejemplo",
      processTime: "texto ejemplo",
      reportTime: "texto ejemplo",
    },
    {
      name: "Examen 3",
      code: "E03",
      indications: "Indicaciones examen 3",
      ServiceId: 1,
      typeSample: "texto ejemplo",
      volume: "texto ejemplo",
      supplies: "texto ejemplo",
      storageTemperature: "texto ejemplo",
      fastingConditions: "texto ejemplo",
      runFrequency: "texto ejemplo",
      processTime: "texto ejemplo",
      reportTime: "texto ejemplo",
    },
    {
      name: "Examen 4",
      code: "E04",
      indications: "Indicaciones examen 4",
      ServiceId: 3,
      typeSample: "texto ejemplo",
      volume: "texto ejemplo",
      supplies: "texto ejemplo",
      storageTemperature: "texto ejemplo",
      fastingConditions: "texto ejemplo",
      runFrequency: "texto ejemplo",
      processTime: "texto ejemplo",
      reportTime: "texto ejemplo",
    },
    {
      name: "Examen 5",
      code: "E05",
      indications: "Indicaciones examen 5",
      ServiceId: 1,
      typeSample: "texto ejemplo",
      volume: "texto ejemplo",
      supplies: "texto ejemplo",
      storageTemperature: "texto ejemplo",
      fastingConditions: "texto ejemplo",
      runFrequency: "texto ejemplo",
      processTime: "texto ejemplo",
      reportTime: "texto ejemplo",
    },
  ]);

  const exam1 = await models.Examination.findByPk(1);
  const exam2 = await models.Examination.findByPk(2);
  const exam3 = await models.Examination.findByPk(3);
  const exam4 = await models.Examination.findByPk(4);
  const exam5 = await models.Examination.findByPk(5);

  //   await exam1.addReferenceValue(1, { through: { allValues: `5.0 - 8.0 : normal
  // >8.0 : Diabetes`, group: "General" } })
  //   await exam1.addReferenceValue(3, { through: { allValues: `positivo - negativo`, group: "General" } })
  //   await exam2.addReferenceValue(2, { through: { allValues: `5.0 - 8.0`, group: "General" } })
  //   await exam3.addReferenceValue(1, { through: { allValues: `5.0 - 8.0`, group: "General" } })

  //   await exam4.addReferenceValue(1, { through: { allValues: `5.0 - 8.0 : normal
  // >8.0 : Diabetes`, group: "General" } })
  //   await exam4.addReferenceValue(2, { through: { allValues: `> 6.5% : Problemas graves
  // 3.0% - 6.5% : Estable
  // <3.0% : precaución`, group: "General" } })
  //   await exam4.addReferenceValue(3, { through: { allValues: `positivo - negativo`, group: "Grupo 2" } })
  //   await exam4.addReferenceValue(4, { through: { allValues: `positivo : Correcto
  // negativo : Principio de cancer`, group: "Grupo 2" } })
  //   await exam4.addReferenceValue(5, { through: { allValues: `5.0 - 8.0`, group: "Grupo 2" } })

  //   await exam5.addReferenceValue(3, { through: { allValues: `positivo : Todo bien`, group: "General" } })
  //   await exam5.addReferenceValue(4, { through: { allValues: `>10.9 : Niños - correcto
  // >13 - Adultos - correcto`, group: "General" } })
  //   await exam5.addReferenceValue(5, { through: { allValues: `3.0 - 4.0 : normal
  // >4.0 Problemas renales`, group: "Otro grupo" } })

  await exam1.addPriceList(1, { through: { price: 300 } });
  await exam2.addPriceList(1, { through: { price: 600.5 } });
  await exam3.addPriceList(1, { through: { price: 700 } });
  await exam4.addPriceList(1, { through: { price: 7150.99 } });
  await exam5.addPriceList(1, { through: { price: 1750.99 } });

  await exam1.addPriceList(2, { through: { price: 400 } });
  await exam2.addPriceList(2, { through: { price: 600 } });
  await exam3.addPriceList(2, { through: { price: 800 } });
  await exam4.addPriceList(2, { through: { price: 6150.99 } });
  await exam5.addPriceList(2, { through: { price: 750.99 } });

  await exam1.addPriceList(3, { through: { price: 500 } });
  await exam2.addPriceList(3, { through: { price: 560 } });
  await exam3.addPriceList(3, { through: { price: 320 } });
  await exam4.addPriceList(3, { through: { price: 5250.99 } });
  await exam5.addPriceList(3, { through: { price: 875.99 } });

  await exam1.addPriceList(4, { through: { price: 600 } });
  await exam2.addPriceList(4, { through: { price: 480 } });
  await exam3.addPriceList(4, { through: { price: 450 } });
  await exam4.addPriceList(4, { through: { price: 3250.99 } });
  await exam5.addPriceList(4, { through: { price: 975.99 } });

  const appoint1 = await models.Appointment.findByPk(1);
  const appoint2 = await models.Appointment.findByPk(2);
  const appoint3 = await models.Appointment.findByPk(3);

  const appoint4 = await models.Appointment.findByPk(4);
  const appoint5 = await models.Appointment.findByPk(5);
  const appoint6 = await models.Appointment.findByPk(6);
  const appoint7 = await models.Appointment.findByPk(7);
  const appoint8 = await models.Appointment.findByPk(8);

  await appoint1.setExaminations([1]);
  await appoint2.setExaminations([1, 2, 3, 4, 5]);
  await appoint3.setExaminations([2, 3]);
  await appoint4.setExaminations([1, 2, 3, 4, 5]);
  await appoint5.setExaminations([1, 2, 3, 4, 5]);
  await appoint6.setExaminations([1, 2, 3, 4, 5]);
  await appoint7.setExaminations([1, 2, 3, 4, 5]);
  await appoint8.setExaminations([1, 2, 3, 4, 5]);

  // //Results appointment 1
  // const appointDetail1Exam1 = await models.AppointmentDetail.findOne({where: {AppointmentId: 1, ExaminationId: 1}});
  // await appointDetail1Exam1.addExaminationValue(1, { through: { value: "50" } })
  // await appointDetail1Exam1.addExaminationValue(3, { through: { value: "55" } })

  // //Results appointment 2
  // const appointDetail2Exam1 = await models.AppointmentDetail.findOne({where: {AppointmentId: 2, ExaminationId: 1}});
  // await appointDetail2Exam1.addExaminationValue(1, { through: { value: "3" } })
  // await appointDetail2Exam1.addExaminationValue(3, { through: { value: "10" } })

  // const appointDetail2Exam2 = await models.AppointmentDetail.findOne({where: {AppointmentId: 2, ExaminationId: 2}});
  // await appointDetail2Exam2.addExaminationValue(2, { through: { value: "35" } })

  // const appointDetail2Exam3 = await models.AppointmentDetail.findOne({where: {AppointmentId: 2, ExaminationId: 3}});
  // await appointDetail2Exam3.addExaminationValue(1, { through: { value: "15" } })

  // const appointDetail2Exam4 = await models.AppointmentDetail.findOne({where: {AppointmentId: 2, ExaminationId: 4}});
  // await appointDetail2Exam4.addExaminationValue(1, { through: { value: "15" } })
  // await appointDetail2Exam4.addExaminationValue(2, { through: { value: "16" } })
  // await appointDetail2Exam4.addExaminationValue(3, { through: { value: "17" } })
  // await appointDetail2Exam4.addExaminationValue(4, { through: { value: "18" } })
  // await appointDetail2Exam4.addExaminationValue(5, { through: { value: "19" } })

  // const appointDetail2Exam5 = await models.AppointmentDetail.findOne({where: {AppointmentId: 2, ExaminationId: 5}});
  // await appointDetail2Exam5.addExaminationValue(3, { through: { value: "27" } })
  // await appointDetail2Exam5.addExaminationValue(4, { through: { value: "28" } })
  // await appointDetail2Exam5.addExaminationValue(5, { through: { value: "29" } })
  // //end results appointment 2
}

module.exports = {
  initialization,
};
