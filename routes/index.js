var express = require('express');
var router = express.Router();
const pingController = require('../controllers/pingController');
const studentController = require('../controllers/studentController');
const teachersController = require('../controllers/teachersController');






/* GET REQUESTS */
router.get('/', pingController.getPing);
router.get('/class', studentController.getStudentsByClass);
router.get('/students', studentController.getStudents);
router.get('/teachers', teachersController.getTeachers);


/*  POST REQUESTS */
router.post('/teachers', teachersController.postTeachers);
router.post('/students', studentController.postStudents);

/*  PUT REQUESTS */
 router.put('/teachers', teachersController.editTeachersById);
router.put('/students', studentController.editStudentsById);



/*  DEL REQUESTS */
//  router.DEL('/teachers', teachersController.putTeachers);
// router.DEL('/students', studentController.editStudentsById);






module.exports = router;