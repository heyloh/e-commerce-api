import Product from "../entities/Product";

export default interface ProductData {
  getProduct(productId: number): Promise<Product>;
}
