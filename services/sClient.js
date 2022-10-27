const models = require("../models");
const {throwException, Op} = require("../global/helpers");
const C = require("../config/properties/constants")

async function updateClient(user_id, data) {
  await models.sequelize.transaction(async transaction=>{
    const client = await getClientByUserId(user_id);
    await client.User.update(data, {transaction});
    await client.update(data, {transaction});
  });
}

async function destroyClient(user_id) {
  await models.sequelize.transaction(async transaction => {
    const client = await getClientByUserId(user_id);
    await client.User.update({ status: 'E' }, { transaction })
    await client.update({ status: 'E' }, { transaction });
  });
}

async function getClient(client_id) {
  const client = await models.Client.findOne({
    where: { id: client_id, status: "A" },
    include: [{
      model: models.User,
      include: [{ model: models.Role }]
    }, {
      model: models.TypeDoc
    }, {
      model: models.District,
      include: [{ model: models.Province, include: [{ model: models.Region }] }]
    }]
  });
  if(!client) {
    throwException("E001");
  }
  return client;
}

async function getClientAll(offset, limit, query = {}) {
  let where = buildQuery(query);

  const {count : total, rows} = await models.Client.findAndCountAll({
    where,
    include: [{
      model: models.User,
      include: [{ model: models.Role }]
    }, {
      model: models.TypeDoc
    }, {
      model: models.District,
      include: [{ model: models.Province, include: [{ model: models.Region }] }]
    }],
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
/*
! -----------
*/
async function getClientByName(offset, limit, query) {
  let where = {status: "A"};

  if(query.name != "" && query.lastNameP != ""){
    where['name'] = query.name,
    where['lastNameP'] = query.lastNameP

    
  const {count : total, rows} = await models.Client.findAndCountAll({
    where,
    include: [{
      model: models.User,
      include: [{ model: models.Client }]
    }, {
      model: models.TypeDoc
    }, {
      model: models.District,
      include: [{ model: models.Province, include: [{ model: models.Region }] }]
    }],
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

  }else if(query.name != "" && query.lastNameP == ""){

    where['name'] = query.name


    const {count : total, rows} = await models.Client.findAndCountAll({
      where,
      include: [{
        model: models.User,
        include: [{ model: models.Client }]
      }, {
        model: models.TypeDoc
      }, {
        model: models.District,
        include: [{ model: models.Province, include: [{ model: models.Region }] }]
      }],
      offset,
      limit,
      distinct: true
    });
    
    const result = {
      total,
      rows,
      count: rows.length
      
    }
  
    if(result.count == 0){
  
      let where = {status: "A"};
  
      if(query.name) { where['lastNameP'] = query.name}
  
      const {count : total, rows} = await models.Client.findAndCountAll({
        where,
        include: [{
          model: models.User,
          include: [{ model: models.Client }]
        }, {
          model: models.TypeDoc
        }, {
          model: models.District,
          include: [{ model: models.Province, include: [{ model: models.Region }] }]
        }],
        offset,
        limit,
        distinct: true
      });
      
      const result = {
        total,
        rows,
        count: rows.length
        
      }
  
      if(result.count == 0){
  
        let where = {status: "A"};
  
        if(query.name) { where['lastNameM'] = query.name}
    
        const {count : total, rows} = await models.Client.findAndCountAll({
          where,
          include: [{
            model: models.User,
            include: [{ model: models.Client }]
          }, {
            model: models.TypeDoc
          }, {
            model: models.District,
            include: [{ model: models.Province, include: [{ model: models.Region }] }]
          }],
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
  
      return result
  
    }

    return result
  }


}

/*
! -----------
*/


/*
* ------------------
*/
 
// async function getClientByName(offset, limit, query) {
//   let where = {status: "A"};

//   if(query.name) { where['name'] = query.name}

//   const {count : total, rows} = await models.Client.findAndCountAll({
//     where,
//     include: [{
//       model: models.User,
//       include: [{ model: models.Client }]
//     }, {
//       model: models.TypeDoc
//     }, {
//       model: models.District,
//       include: [{ model: models.Province, include: [{ model: models.Region }] }]
//     }],
//     offset,
//     limit,
//     distinct: true
//   });
  
//   const result = {
//     total,
//     rows,
//     count: rows.length
    
//   }

//   if(result.count == 0){

//     let where = {status: "A"};

//     if(query.name) { where['lastNameP'] = query.name}

//     const {count : total, rows} = await models.Client.findAndCountAll({
//       where,
//       include: [{
//         model: models.User,
//         include: [{ model: models.Client }]
//       }, {
//         model: models.TypeDoc
//       }, {
//         model: models.District,
//         include: [{ model: models.Province, include: [{ model: models.Region }] }]
//       }],
//       offset,
//       limit,
//       distinct: true
//     });
    
//     const result = {
//       total,
//       rows,
//       count: rows.length
      
//     }

//     if(result.count == 0){

//       let where = {status: "A"};

//       if(query.name) { where['lastNameM'] = query.name}
  
//       const {count : total, rows} = await models.Client.findAndCountAll({
//         where,
//         include: [{
//           model: models.User,
//           include: [{ model: models.Client }]
//         }, {
//           model: models.TypeDoc
//         }, {
//           model: models.District,
//           include: [{ model: models.Province, include: [{ model: models.Region }] }]
//         }],
//         offset,
//         limit,
//         distinct: true
//       });
      
//       const result = {
//         total,
//         rows,
//         count: rows.length
        
//       }

//       return result
//     }

//     return result

//   }
  
//   return result
// }

/*
* ------------------
*/


async function getClientByUserId(UserId) {
  const client = await models.Client.findOne({
    where: { UserId, status: "A" },
    include: [{model: models.User}]
  });
  
  if(!client) {
    throwException("E001");
  }
  return client;
}

async function getClientByDOC(query) {
  let where = { status: 'A' };

  if (query.dni) { where['dni'] = query.dni }
  if (query.passport) {
    where['dni'] = query.passport
    where['TypeDocId'] = 2;
  }

  const client = await models.Client.findOne({
    where,
    include: [{model: models.User}]
  });
  
  if(!client) {
    throwException("E001");
  }
  return client;
}

// async function getClientByName(query) {
//   let where = { status: 'A'};

//   if (query.name) { where['name'] = query.name }


//   const client = await models.Client.findAndCountAll({
//     where,
//     include: [{model: models.User}]
//   });
  
//   if(!client) {
//     throwException("E001");
//   }
//   return client;
// }



function buildQuery(query) {
  let where = { status: 'A' };

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
  if (query.dni) { where['dni'] = { [Op.iLike]: `%${query.dni}%` } };
  if (query.passport) { 
    where['dni'] = query.passport 
    where['TypeDocId'] = 2
  };

  return where;
}

module.exports = {
  updateClient,
  destroyClient,
  getClient,
  getClientAll,
  getClientByUserId,
  getClientByDOC,
  getClientByName
}