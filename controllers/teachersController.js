var teachersModel = require('../model/teachersModel');
var moment = require('moment');

exports.getTeachers = async (req, res, next) => {
  console.log('entering teachers controller');
  let error = {
    reason: ''
  }
  try {

    let fullName = '';
    let teacher = {};

    //Filters
    if (req.query.name) {
      console.log('entered')
      //Preparing teacher name for query
      teacher.name = req.query.name.split(' ').forEach(name => {
        fullName += `%${name}%`;
      });
      teacher.name = fullName;

    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }

    var teachers = await teachersModel.getTeachers(teacher);


    teachers.forEach(teacher => {
      //Cleaning the data 
      teacher.birth_date = moment(teacher.birth_date).format('DD/MM/YYYY');
      teacher.start_date = moment(teacher.start_date).format('DD/MM/YYYY');
      teacher.address = teacher.address.replace(/\n/g, '');

    });
    res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
    error.reason = 'Service Error';
    res.status(500).json(error);
  }

};




exports.postTeachers = async (req, res, next) => {
  console.log('Posting new teachers controller');
  let error = {
    reason: ''
  }
  try {
    console.log(req.body);
    let teacher = req.body;

    //Filters
    if (req.body.first_name) {
      console.log('entered') 
      var teachers = await teachersModel.postTeachers(teacher);
      console.log(teachers)
    } else {
      error.reason = 'No name provided';
      res.status(500).json(error)
    }

  
    res.status(200).json({ success: true});
  } catch (e) {
    console.log(e);
    error.reason = 'Service Error';
    res.status(500).json(error);
  }

};