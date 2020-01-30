/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */

const announcement = req => {
  const announce = {
    text: req.body.text,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  return announce;
};
export default announcement;
