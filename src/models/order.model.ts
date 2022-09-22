import { Order } from './../types/orders.type';
import User from '../types/user.type';
import DB from '../database/database';



class OrderModel {

  // Get All Orders
  async show(id: string): Promise<Order[] | null> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql,[id]);
      if (result.rows.length) {
        connection.release();
        return result.rows;
      }
      return null
    } catch (err) {
      throw new Error('Unable to Get Order');
    }
  }
}

export default OrderModel;
