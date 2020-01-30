const createAnnouncement = `INSERT INTO announcements (
    owner,
    status,
    text,
    startdate,
    enddate) VALUES ($1, $2, $3, $4, $5)`;

const getOne = 'SELECT * FROM announcements WHERE text=$1';

export default { createAnnouncement, getOne };
