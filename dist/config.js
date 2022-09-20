"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_DB_TEST, POSTGRES_PASS, NODE_ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.default = {
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
