"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userTable = "\n    CREATE TABLE IF NOT EXISTS users(\n                id SERIAL PRIMARY KEY ,\n                email text NOT NULL UNIQUE,\n                firstName VARCHAR(100),\n                lastName VARCHAR(100),\n                password text NOT NULL,\n                phoneNumber VARCHAR(19) NOT NULL,\n                address VARCHAR(100) NOT NULL,\n                isAdmin BOOLEAN NOT NULL)";
var deleteTable = 'DROP TABLE IF EXISTS users';
var _default = {
  userTable: userTable,
  deleteTable: deleteTable
};
exports["default"] = _default;