import pool from '../config/config';
import model from './models.query';

const deleteTable = async () => {
  await pool.query(model.deleteTable);
};

deleteTable();

export default deleteTable;
