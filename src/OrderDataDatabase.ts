import pgp from "pg-promise";

import OrderData from "./OrderData";

export default class OrderDataDatabase implements OrderData {
  async save(order: any): Promise<void> {
    const connection = pgp()(
      "postgres://postgres:123456@localhost:5432/app-branas"
    );
    await connection.query(
      "insert into cccat9.order (cpf, total) values ($1, $2)",
      [order.cpf, order.total]
    );
    await connection.$pool.end();
  }

  async getByCpf(cpf: string): Promise<any> {
    const connection = pgp()(
      "postgres://postgres:123456@localhost:5432/app-branas"
    );
    const [orderData] = await connection.query(
      "select * from cccat9.order where cpf = $1",
      [cpf]
    );
    await connection.$pool.end();
    return orderData;
  }

  async count(): Promise<number> {
    const connection = pgp()(
      "postgres://postgres:123456@localhost:5432/app-branas"
    );
    const [options] = await connection.query(
      "select count(*)::integer as count from cccat9.order"
    );
    await connection.$pool.end();
    return options.count;
  }
}
