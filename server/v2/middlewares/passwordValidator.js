/* eslint-disable arrow-parens */
/* eslint-disable new-cap */
import passwordValidator from 'password-validator';

const validatePassword = password => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .lowercase()
    .has()
    .uppercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces()
    .has()
    .symbols();

  return schema.validate(password);
};

export default validatePassword;
