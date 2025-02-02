import { Pool } from 'pg';
import config from '../../config';

const pool = new Pool({
  host: config.host,
  database: config.node_env === "env" ? config.postgres_db : config.postgres_db_test,
  user: config.postgres_user,
  password: config.postgres_pass,
  port: parseInt(config.postgres_port as string, 10),
  max: 4,
});

pool.on('error', (err: Error) => {
  console.log('Error Because Of ' + err.message);
});

export default pool;
