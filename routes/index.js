var express = require('express');
var router = express.Router();
const pingController = require('../controllers/pingController');
const studentController = require('../controllers/studentController');
const teachersController = require('../controllers/teachersController');

/* GET home page. */
router.get('/', pingController.getPing);
router.get('/class', studentController.getStudentsByClass);
router.get('/students', studentController.getStudents);
router.get('/teachers', teachersController.getTeachers);





module.exports = router;