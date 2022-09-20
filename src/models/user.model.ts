import User from '../types/user.type';
import DB from '../database';
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
      const sql =
        'INSERT INTO users (email , user_name, first_name, last_name, password ) VALUES ($1,$2,$3,$4,$5) returning id, email , user_name, first_name, last_name';
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
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
  async getUsers(): Promise<User[]> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM users;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error('Unable to Get Users');
    }
  }
  // Get a Specific User
  async getSpecific(id: string): Promise<User> {
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
  // Update User
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await DB.connect();
      const sql = `UPDATE users 
        SET email=$1, user_name=$2, first_name=$3,
        last_name=$4, password=$5 WHERE id=$6 returning *
        `;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password as string),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`'Unable to Update User'
         ${u.first_name}: ${(err as Error).message} `);
    }
  }
  // Delete User
  async deleteOne(u: User): Promise<User> {
    try {
      const connection = await DB.connect();
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
    } catch (err) {
      throw new Error(`Unable to DELETE User
         ${u.first_name}: ${(err as Error).message} `);
    }
  }
  // Authenticate User

  async Authentication(email: string, password: string): Promise<User | null> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length > 0) {
        const { password: hashedPass } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashedPass
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id,user_name,email,first_name,last_name,password FROM users WHERE email=$1',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Cannot Authenticate the email: 
         ${email}: ${(error as Error).message} `);
    }
  }
}

export default UserModel;
