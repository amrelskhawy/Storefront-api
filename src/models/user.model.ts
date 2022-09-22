import jwt from 'jsonwebtoken';
import User from '../types/user.type';
import DB from '../database/database';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPass = (plainPass: string): string => {
  const salt = parseInt(config.salt_rounds as string, 10);

  return bcrypt.hashSync(`${plainPass}${config.pepper}`, salt);
};

const compare = (plainPass: string, hashedPass: string) => {
  return bcrypt.compareSync(plainPass as string, hashPass(plainPass));
};

class UserModel {
  // Create New User
  async create(u: User): Promise<User> {
    try {
      const connection = await DB.connect();
      const sql = 'INSERT INTO users ( first_name, last_name, password ) VALUES ($1,$2,$3) returning id,first_name, last_name';
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        hashPass(u.password as string),
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`'Unable to create User'
         ${u.first_name}: ${(err as Error).message} `);
    }
  }
  // Get All Users
  async index(): Promise<User[]> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT id, first_name, last_name FROM users;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error('Unable to Get Users');
    }
  }
  // Get a Specific User
  async show(id: string): Promise<User> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM users where id = $1;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Unable to Get User with id : ' + id);
    }
  }


  // Authenticate User

  async Authentication(first_name: string, password: string): Promise<User | null> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT password from users WHERE first_name=$1'
      const result = await connection.query(sql, [first_name])
      if (result.rows.length) {
        const { password: hashedPass } = result.rows[0]
        const isPassword = bcrypt.compareSync(`${password}${config.pepper}`, hashedPass)
        if (isPassword) {
          const userInfo = await connection.query(
            'SELECT id , first_name, last_name from users WHERE first_name=($1)'
            , [first_name])
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error('Unable To Login')
    }
  }
}

export default UserModel;
