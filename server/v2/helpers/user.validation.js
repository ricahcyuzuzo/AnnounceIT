/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import Hapi from '@hapi/joi';

const validation = user => {
  const schema = Hapi.object().keys({
    email: Hapi.string()
      .email()
      .required(),
    firstName: Hapi.string()
      .required()
      .trim()
      .min(3)
      .regex(/^[^\d\s!@£$%^&*()+=#^-_'"?{}]+$/)
      .message({
        'string.pattern.base':
          'firstname must consist only letters, no white spaces, no digits and no special character of any kind'
      }),
    lastName: Hapi.string()
      .required()
      .trim()
      .min(3)
      .regex(/^[^\d\s!@£$%^&*()+=#^-_'"?{}]+$/)
      .message({
        'string.pattern.base':
          'lastname must consist only letters, no white spaces, no digits and no special character of any kind'
      }),
    password: Hapi.string().required(),
    phoneNumber: Hapi.string()
      .required()
      .trim()
      .regex(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/)
      .message({
        'string.pattern.base':
          'Phone number must be like this (XXX) XXX-XXXX | XXX-XXX-XXXX'
      }),
    address: Hapi.string()
      .required()
      .trim()
  });

  return schema.validate(user);
};

const validateSignin = user => {
  const schema = Hapi.object({
    email: Hapi.string()
      .email()
      .required(),
    password: Hapi.string().required()
  });

  return schema.validate(user);
};

export default { validation, validateSignin };
