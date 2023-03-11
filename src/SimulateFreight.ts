import ProductData from "./ProductData";

export default class SimulateFreight {
  constructor(readonly productData: ProductData) {}

  async execute(input: Input): Promise<Output> {
    let total = 0;
    for (const item of input.items) {
      const product = await this.productData.getProduct(item.productId);
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.height <= 0 || product.width <= 0 || product.depth <= 0) {
        throw new Error("Product dimensions cannot be negative");
      }
      if (product.weight <= 0) {
        throw new Error("Product weight cannot be negative");
      }
      const volume =
        (product.height / 100) * (product.width / 100) * (product.length / 100);
      const density = parseFloat(product.weight) / volume;
      const itemFreight = 1000 * volume * (density / 100);
      total += itemFreight >= 10 ? itemFreight : 10;
    }
    return {
      total,
    };
  }
}

type Input = {
  items: { productId: number; quantity: number }[];
};

type Output = {
  total: number;
};
