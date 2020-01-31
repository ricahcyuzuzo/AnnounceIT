"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-mutable-exports */

/* eslint-disable comma-dangle */
_dotenv["default"].config();

var pool;
var isProduction = process.env.NODE_ENV === 'isProduction';

if (process.env.NODE_ENV === 'isTesting') {
  pool = new _pg.Pool({
    connectionString: process.env.TESTING_URL
  });
} else if (process.env.NODE_ENV === 'isProduction') {
  pool = new _pg.Pool({
    connectionString: process.env.PRODUCTION_URL,
    ssl: isProduction
  });
} else {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}

var _default = pool;
exports["default"] = _default;