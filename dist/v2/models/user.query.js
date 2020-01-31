"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var signupQuery = "INSERT INTO users(\nemail,\nfirstName,\nlastName,\npassword,\nphoneNumber,\naddress,\nisAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7)";
var getOne = "\nSELECT id, email, firstName, lastName, phoneNumber, address, isAdmin from users WHERE email=$1";
var getOneLogin = 'SELECT * FROM users WHERE email=$1';
var _default = {
  getOne: getOne,
  signupQuery: signupQuery,
  getOneLogin: getOneLogin
};
exports["default"] = _default;