/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import Hapi from '@hapi/joi';

const validation = user => {
  const schema = Hapi.object({
    id: Hapi.number().required(),
    email: Hapi.string()
      .email()
      .required(),
    firstName: Hapi.string()
      .required()
      .trim(),
    lastName: Hapi.string()
      .required()
      .trim(),
    password: Hapi.string()
      .required()
      .trim(),
    phoneNumber: Hapi.string()
      .required()
      .trim(),
    address: Hapi.string()
      .required()
      .trim(),
    isAdmin: Hapi.boolean().required()
  });

  return schema.validate(user);
};

export default { validation };
