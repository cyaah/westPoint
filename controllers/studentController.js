var studentModel = require('../model/studentModel');
var moment = require('moment');



/* GET Student */
exports.getStudents = async (req, res, next) => {
  try {
    let error = {
      reason: ''
    }
    let fullName = '';
    let student = {};

    //Filters
    if (req.query.name) {

      /* Preparing joint name. (Check optimize) */
      student.name = req.query.name.split(' ').forEach(name => {
        fullName += `%${name}%`;
      });
      student.name = fullName;

      var students = await studentModel.getStudents(student);


      //Modulerize***
      students.forEach(student => {
        //Cleaning the data 
        student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
        student.address = student.address.replace(/\n/g, '');
      });
      res.status(200).json(students);
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    };
  } catch (e) {
    error.reason = 'Service Error';
    res.status(500).json(error);
    throw e;
  }

};

/* GET Student By Class */
exports.getStudentsByClass = async (req, res, next) => {
  try {
    let lass = req.query.class;
    let section = req.query.section;
    let student = {};
    let error = {};
    student.class = Class;
    student.section = section;

    if (!Class && !section) {
      error.reason = 'No section or class provided';
      res.status(500).json(error);
    }

    var students = await studentModel.getStudentsByClass(student);

    //Modulerize***
    students.forEach(student => {
      //Cleaning the data 
      student.birth_date = moment(student.birth_date).format('DD/MM/YYYY');
      student.address = student.address.replace(/\n/g, '');

    });
    res.status(200).json(students);

  } catch (e) {
    console.log(e);
    error.reason = 'Service Error';
    res.status(500).json(error);
    throw e;
  }

};

/* POST Student */
exports.postStudents = async (req, res, next) => {
  console.log('Posting new Students controller');
  let error = {};
  try {
    let student = req.body;

    //Check
    // Object.keys(req.body).length === 0 && req.body.constructor === Object
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      var students = await studentModel.postStudents(student);

      res.status(200).json({
        success: true
      });
    } else {
      error.reason = 'No student details provided.';
      res.status(500).json(error)
    }


  } catch (e) {
    console.log(e);
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }

};

/* PUT Student By Class */
exports.editStudentsById = async (req, res, next) => {
  console.log('EDITING Students controller');
  let error = {};
  try {
    let details = req.body;

    //Check
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      var student = await studentModel.putStudent(details);
      res.status(200).json({
        success: true
      });
    } else {
      error.reason = 'No student details provided.';
      res.status(500).json(error)
    }

  } catch (e) {
    console.log(e);
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }

};


/* DEL Student By Class */
exports.deleteStudentsById = async (req, res, next) => {
  console.log('DELETE Students controller');
  let error = {};
  try {
    let studentId = req.query.studentId;

    //Check
    if (studentId && typeOf(studentId) === "number") {
      var student = await studentModel.delStudent(studentId);
      res.status(200).json({
        success: true
      });
    } else if (!studentId) {
      error.reason = 'No ID provided';
      res.status(500).json(error)
    } else if (typeOf(studentId) !== "number") {
      error.reason = 'Not a number';
      res.status(500).json(error)
    }
  } catch (e) {
    console.log(e);
    if (e.error) {
      error.reason = e.error
    } else {
      error.reason = 'Service Error';
    }
    res.status(500).json(error);
  }

};