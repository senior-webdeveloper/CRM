var express = require("express"),
  cUnit = require("../controllers/cUnit");

var router = express.Router();

router.get("/all", cUnit.getAllUnit);
router.get("/", cUnit.getPagedUnit);
router.post("/", cUnit.createUnit);
router.get("/:id", cUnit.getUnit);
router.put("/:id", cUnit.updateUnit);
router.delete("/:id", cUnit.deleteUnit);

module.exports = router;
