import DB from '../database/database';
import { Product } from '../types/product.type';

class ProductModel {
  // Create New User
  async create(p: Product): Promise<Product| null> {
    try {
      const connection = await DB.connect();
      const sql =
        'INSERT INTO products ( name, price, category ) VALUES ($1,$2,$3) returning id,name, price, category';
        if (p.category === 'active' || p.category === 'complete') {
          const result = await connection.query(sql, [
            p.name,
            p.price,
            p.category,
          ]);
          connection.release();
          return result.rows[0];
        } else {
          throw new Error(`'Unable to create Product'
          ${p.name} `);
        }
        return null
    } catch (err) {
      throw new Error(`'Unable to create Product'
         ${p.name}: ${(err as Error).message} `);
    }
  }
  // Get All Users
  async index(): Promise<Product[]> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM products;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error('Unable to Get Products');
    }
  }
  // Get a Specific User
  async show(id: string): Promise<Product> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM products where id = $1;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Unable to Get Product with id : ' + id);
    }
  }

}

export default ProductModel;
