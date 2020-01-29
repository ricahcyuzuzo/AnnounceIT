const userTable = `
    CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY ,
                email text NOT NULL UNIQUE,
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                password text NOT NULL,
                phoneNumber VARCHAR(19) NOT NULL,
                address VARCHAR(100) NOT NULL,
                isAdmin BOOLEAN NOT NULL)`;

const deleteTable = 'DROP TABLE IF EXISTS users';

export default { userTable, deleteTable };
