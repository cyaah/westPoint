exports.getStudents = async(req, res, next) => {
  console.log('jeressss')
  let ping = {
    "success": 'got students'
  };
  res.status(200).json(ping)
};