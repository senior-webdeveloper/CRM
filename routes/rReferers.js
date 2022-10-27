var express = require("express"),
	cReferer = require("../controllers/cReferer");

var router = express.Router();

router.get("/all",cReferer.getAllReferers);
router.post("/",cReferer.addReferer);

module.exports = router;
