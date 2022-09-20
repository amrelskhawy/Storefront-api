import { Order } from './../types/orders.type';
import User from '../types/user.type';
import DB from '../database/database';



class OrderModel {

  // Get All Orders
  async index(): Promise<Order[]> {
    try {
      const connection = await DB.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error('Unable to Get Users');
    }
  }
}

export default OrderModel;
