var express = require('express');
var router = express.Router();
const pingController = require('../controllers/pingController');
const studentController = require('../controllers/studentController');

/* GET home page. */
router.get('/', pingController.getPing);
router.get('/class', studentController.getStudentsByClass);
router.get('/students', studentController.getStudents);




module.exports = router;
