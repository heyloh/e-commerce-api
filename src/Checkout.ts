import CouponData from "./CouponData";
import ProductData from "./ProductData";
import { validate } from "./CpfValidator";
import CurrencyGateway from "./CurrencyGateway";
import RandomCurrencyGateway from "./RandomCurrencyGateway";

export default class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly currencyGateway: CurrencyGateway = new RandomCurrencyGateway()
  ) {}

  async execute(input: Input) {
    const { cpf, items } = input;
    const isCpfValid = validate(cpf);
    if (!isCpfValid) {
      throw new Error("Invalid CPF");
    }
    let total = 0;
    let freight = 0;
    const productIds: number[] = [];
    const currencies: any = await this.currencyGateway.getCurrencies();
    for (const item of items) {
      if (productIds.some((productId) => productId === item.productId)) {
        throw new Error("Product cannot be repeated");
      }
      productIds.push(item.productId);
      if (item.quantity <= 0) {
        throw new Error("Product quantity cannot be negative");
      }
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
      total +=
        parseFloat(product.price) *
        (currencies[product.currency] || 1) *
        item.quantity;
      const volume =
        (product.height / 100) * (product.width / 100) * (product.length / 100);
      const density = parseFloat(product.weight) / volume;
      const itemFreight = 1000 * volume * (density / 100);
      freight += itemFreight >= 10 ? itemFreight : 10;
    }
    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      const isCouponExpired = coupon.expiry_date.getTime() < Date.now();
      if (coupon && !isCouponExpired) {
        total -= (total * coupon.percentage) / 100;
      }
    }
    total += freight;
    return { total };
  }
}

type Input = {
  cpf: string;
  items: { productId: number; quantity: number }[];
  coupon?: string;
};
