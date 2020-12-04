var studentModel = require('../model/studentModel');

exports.getStudents = async (req, res, next) => {
  console.log('jeressss')
  let ping = {
    "success": 'got students'
  };
  var students = await studentModel.getStudents();
  res.status(200).json(students);
};