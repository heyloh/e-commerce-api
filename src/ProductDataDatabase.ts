import pgp from "pg-promise";
import ProductData from "./ProductData";

export default class ProductDataDatabase implements ProductData {
  async getProduct(productId: number): Promise<any> {
    const connection = pgp()(
      "postgres://postgres:123456@localhost:5432/app-branas"
    );
    const [product] = await connection.query(
      "select * from cccat9.product where product_id = $1",
      [productId]
    );
    connection.$pool.end();
    return product;
  }
}
