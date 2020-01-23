/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import Hapi from '@hapi/joi';

const validation = announcement => {
  const schema = Hapi.object({
    id: Hapi.number().required(),
    owner: Hapi.number().required(),
    status: Hapi.string()
      .required()
      .trim(),
    text: Hapi.string()
      .required()
      .min(50)
      .trim(),
    startDate: Hapi.date().required(),
    endDate: Hapi.date().required()
  });

  return schema.validate(announcement);
};
export default validation;
