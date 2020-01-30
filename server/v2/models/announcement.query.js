/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const createAnnouncement = `INSERT INTO announcements (
    owner,
    status,
    text,
    startdate,
    enddate) VALUES ($1, $2, $3, $4, $5)`;

const getOne = 'SELECT * FROM announcements WHERE text=$1';
const getOneUpdate = 'SELECT * FROM announcements WHERE id=$1';
const updateAnnouncement =
  'UPDATE announcements SET text=$1, startdate=$2, enddate=$3 WHERE id=$4';
export default { createAnnouncement, getOne, getOneUpdate, updateAnnouncement };
