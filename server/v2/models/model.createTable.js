/* eslint-disable import/no-unresolved */
import pool from '../config/config';
import model from './models.query';

const createTables = async () => {
  await pool.query(model.userTable);
};

createTables();

export default createTables;
