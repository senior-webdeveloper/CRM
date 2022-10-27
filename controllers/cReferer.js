const sReferer = require("../services/sReferer"),
  {
    makeResponseOkMessage,
    makeResponseOk,
    makeResponseException,
  } = require("../global/response");

// const sReferer = require("../services/sReferer");

// async function getReferers(res) {
//   try {
//     let referers = await sReferer.getRefererAll();
//     makeResponseOk(res, { data: referers }, "referer/listReferer");
//   } catch (err) {
//     makeResponseException(res, err);
//   }
// }


async function getAllReferers(req, res) {
  try {
    const referers = await sReferer.getAllReferers();
    makeResponseOk(res, {data: referers}, "referers/all");
  } catch(err) {
    makeResponseException(res, err);
  }
}



async function addReferer(req, res) {
  try {
    let data = req.fields;
    await sReferer.addReferer(data);
    makeResponseOkMessage(res, "I060");
  } catch (err) {
    makeResponseException(res, err);
  }
}


module.exports = {
  addReferer,
  getAllReferers,

};
