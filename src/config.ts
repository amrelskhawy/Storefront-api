import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_DB_TEST,
  POSTGRES_PASS,
  NODE_ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  postgres_port: POSTGRES_PORT,
  postgres_user: POSTGRES_USER,
  postgres_db: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  postgres_db_test: POSTGRES_DB_TEST,
  postgres_pass: POSTGRES_PASS,
  pepper: BCRYPT_PASSWORD,
  salt_rounds: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
