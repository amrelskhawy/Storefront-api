"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPass = (plainPass) => {
    const salt = parseInt(config_1.default.salt_rounds, 10);
    return bcrypt_1.default.hashSync(`${plainPass}${config_1.default.pepper}`, salt);
};
const compare = (plainPass, hashedPass) => {
    return bcrypt_1.default.compareSync(plainPass, hashPass(plainPass));
};
class UserModel {
    // Create New User
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO users (email , user_name, first_name, last_name, password ) VALUES ($1,$2,$3,$4,$5) returning id, email , user_name, first_name, last_name';
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPass(u.password),
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`'Unable to create User'
         ${u.first_name}: ${err.message} `);
        }
    }
    // Get All Users
    async getUsers() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Unable to Get Users');
        }
    }
    // Get a Specific User
    async getSpecific(id) {
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
    // Update User
    async updateOne(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = `UPDATE users 
        SET email=$1, user_name=$2, first_name=$3,
        last_name=$4, password=$5 WHERE id=$6 returning *
        `;
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPass(u.password),
                u.id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`'Unable to Update User'
         ${u.first_name}: ${err.message} `);
        }
    }
    // Delete User
    async deleteOne(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM users 
        WHERE id=$1 returning *
        `;
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                u.password,
                u.id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to DELETE User
         ${u.first_name}: ${err.message} `);
        }
    }
    // Authenticate User
    async Authentication(email, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';
            const result = await connection.query(sql, [email]);
            if (result.rows.length > 0) {
                const { password: hashedPass } = result.rows[0];
                const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashedPass);
                if (isPasswordValid) {
                    const userInfo = await connection.query('SELECT id,user_name,email,first_name,last_name,password FROM users WHERE email=$1', [email]);
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        }
        catch (error) {
            throw new Error(`Cannot Authenticate the email: 
         ${email}: ${error.message} `);
        }
    }
}
exports.default = UserModel;
