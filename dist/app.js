"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _auth = _interopRequireDefault(require("./v1/routes/auth.routes"));

var _advertiser = _interopRequireDefault(require("./v1/routes/advertiser.routes"));

var _admin = _interopRequireDefault(require("./v1/routes/admin.routes"));

var _auth2 = _interopRequireDefault(require("./v2/routes/auth.routes"));

var _advertiser2 = _interopRequireDefault(require("./v2/routes/advertiser.routes"));

var _admin2 = _interopRequireDefault(require("./v2/routes/admin.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])('dev'));
app.use('/api/v1', _auth["default"]);
app.use('/api/v1', _advertiser["default"]);
app.use('/api/v1', _admin["default"]);
app.use('/api/v2', _auth2["default"]);
app.use('/api/v2', _advertiser2["default"]);
app.use('/api/v2', _admin2["default"]);
app.get('/', function (req, res) {
  res.send({
    Message: 'Welcome on the Api'
  });
});
app.use(function (req, res) {
  res.type('json').status(404).json({
    status: 404,
    errorMessage: '404 Not Found!'
  });
});
app.listen(port, console.log(port));
var _default = app;
exports["default"] = _default;