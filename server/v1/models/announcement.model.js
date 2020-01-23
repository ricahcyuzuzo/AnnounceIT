/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import announcements from './announcement.db';

const announcement = req => {
  const announce = {
    id: announcements.length + 1,
    owner: req.body.owner,
    status: 'pending',
    text: req.body.text,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  return announce;
};
export default announcement;
