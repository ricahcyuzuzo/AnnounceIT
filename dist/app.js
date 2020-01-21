"use strict";

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./v1/routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('/api/v1', _auth["default"]);
app.get('/', function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Welcome to the AnnounceIT API"
  });
});
var port = process.env.PORT || 3000;
app.listen(port, console.log("The API is running on server \"http://localhost:".concat(port, "/api/v1\"")));