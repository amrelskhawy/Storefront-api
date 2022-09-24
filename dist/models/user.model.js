"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPass = (plainPass) => {
    const salt = parseInt(config_1.default.salt_rounds, 10);
    return bcrypt_1.default.hashSync(`${plainPass}${config_1.default.pepper}`, salt);
};
class UserModel {
    // Create New User
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO users ( first_name, last_name, password ) VALUES ($1,$2,$3) returning id,first_name, last_name';
            const result = await connection.query(sql, [
                u.first_name,
                u.last_name,
                hashPass(u.password),
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create User ${u.first_name}: ${err.message} `);
        }
    }
    // Get All Users
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, first_name, last_name FROM users;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Unable to Get Users');
        }
    }
    // Get a Specific User
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users where id = $1;';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error('Unable to Get User with id : ' + id);
        }
    }
    // Authenticate User
    async Authentication(first_name, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT password from users WHERE first_name=$1';
            const result = await connection.query(sql, [first_name]);
            if (result.rows.length) {
                const { password: hashedPass } = result.rows[0];
                const isPassword = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashedPass);
                if (isPassword) {
                    const userInfo = await connection.query('SELECT id , first_name, last_name from users WHERE first_name=($1)', [first_name]);
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        }
        catch (error) {
            throw new Error('Unable To Login');
        }
    }
}
exports.default = UserModel;
