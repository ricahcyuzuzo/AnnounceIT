/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import Hapi from '@hapi/joi';

const validation = (user) => {
  const schema = Hapi.object({
    id: Hapi.number().required(),
    email: Hapi.string()
      .email()
      .required(),
    first_name: Hapi.string().required(),
    last_name: Hapi.string().required(),
    password: Hapi.string().required(),
    phoneNumber: Hapi.string().required(),
    address: Hapi.string().required(),
    is_admin: Hapi.boolean().required(),
  });

  return schema.validate(user);
};

export default validation;
