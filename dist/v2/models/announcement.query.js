"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable comma-dangle */

/* eslint-disable object-curly-newline */

/* eslint-disable operator-linebreak */
var createAnnouncement = "INSERT INTO announcements (\n    owner,\n    status,\n    text,\n    startdate,\n    enddate) VALUES ($1, $2, $3, $4, $5)";
var getOne = 'SELECT * FROM announcements WHERE text=$1';
var getOneUpdate = 'SELECT * FROM announcements WHERE id=$1';
var updateAnnouncement = 'UPDATE announcements SET text=$1, startdate=$2, enddate=$3 WHERE id=$4';
var getmyAnnouncements = 'SELECT * FROM announcements WHERE owner=$1';
var getallbyState = 'SELECT * FROM announcements WHERE status=$1';
var getAnnouncement = 'SELECT text, startdate, enddate FROM announcements WHERE id=$1';
var deleteAnnouncement = 'DELETE FROM announcements WHERE id=$1';
var changeStatus = 'UPDATE announcements SET status=$1 WHERE id=$2';
var getallAnnouncements = 'SELECT * FROM announcements';
var _default = {
  createAnnouncement: createAnnouncement,
  getOne: getOne,
  getOneUpdate: getOneUpdate,
  updateAnnouncement: updateAnnouncement,
  getmyAnnouncements: getmyAnnouncements,
  getallbyState: getallbyState,
  getAnnouncement: getAnnouncement,
  deleteAnnouncement: deleteAnnouncement,
  changeStatus: changeStatus,
  getallAnnouncements: getallAnnouncements
};
exports["default"] = _default;