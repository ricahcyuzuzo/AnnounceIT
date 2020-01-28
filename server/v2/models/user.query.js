const signupQuery = `INSERT INTO users(
id,
email,
firstName,
lastName,
password,
phoneNumber,
address,
isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

const getOne = `
SELECT id, email, firstName, lastName, phoneNumber, address, isAdmin from users WHERE email=$1`;

export default { getOne, signupQuery };
