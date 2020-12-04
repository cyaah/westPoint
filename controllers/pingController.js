//Ping api to check if running succesfully
exports.getPing = function (req, res, next) {
  console.log('jeressss')
  let ping = {
    "success": true
  };
  res.status(200).json(ping)

}