var express = require("express"),
	cReport = require("../controllers/cReport");

var router = express.Router();

router.get("/appointments",cReport.getAppointmentsByMonth);
router.get("/appointments/date",cReport.getAppointmentsByDate);
router.get("/result/:id",cReport.getAppointmentResultsPDF);

module.exports = router;