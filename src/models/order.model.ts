import { Order } from './../types/orders.type';
import DB from '../database/database';

class OrderModel {

  // Add An Order
  async create(order: Order): Promise<Order | null> {
    try {
      const connection = await DB.connect();
      const sql = 'INSERT INTO orders ( user_id, status ) VALUES ($1,$2) returning id,user_id, status';

      if (order.status === 'active' || order.status === 'completed') {
        const result = await connection.query(sql, [order.user_id, order.status]);
        connection.release();
        return result.rows[0];
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Unable to create Order ${order.id} to user ${order.user_id} ${(error as Error).message}`);
    }
  }

  // Get Specific Orders
  async show(id: string): Promise<Order[] | null> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      if (result.rows.length) {
        connection.release();
        return result.rows;
      }
      return null
    } catch (err) {
      throw new Error('Unable to Get Order');
    }
  }


  async addProduct(orderId: number, productId: number, quantity: number) {
    try {

      const connection = await DB.connect();
      const sql = `INSERT INTO products_orders ( product_id, order_id, product_quantity) VALUES ($1, $2, $3) RETURNING *`;

      const result = await connection.query(sql, [productId, orderId, quantity]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error Because of ${(error as Error).message}`);
      
    }
  }
}

export default OrderModel;
