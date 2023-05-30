import pgp from "pg-promise";
import ProductData from "../../domain/data/ProductData";
import Product from "../../domain/entities/Product";
import Connection from "../database/Connection";

export default class ProductDataDatabase implements ProductData {
  constructor(readonly connection: Connection) {}

  async getProduct(productId: number): Promise<Product> {
    const [product] = await this.connection.query(
      "select * from cccat9.product where product_id = $1",
      [productId]
    );

    if (!product) throw new Error("Product not found");

    return new Product(
      product.product_id,
      product.description,
      parseFloat(product.price),
      parseFloat(product.height),
      parseFloat(product.width),
      parseFloat(product.length),
      parseFloat(product.weight),
      product.currency
    );
  }
}
