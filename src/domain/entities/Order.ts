import Coupon from "./Coupon";
import Cpf from "./Cpf";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  items: Item[];
  coupon?: Coupon;
  code: OrderCode;
  freight = 0;

  constructor(cpf: string, date: Date = new Date(), sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.code = new OrderCode(date, sequence);
  }

  addItem(
    product: Product,
    quantity: number,
    currencyCode: string = "BRL",
    currencyValue: number = 1
  ) {
    if (this.items.some((item) => item.productId === product.productId)) {
      throw new Error("Product cannot be repeated");
    }
    this.items.push(
      new Item(
        product.productId,
        product.price,
        quantity,
        currencyCode,
        currencyValue
      )
    );
    this.freight += FreightCalculator.calculate(product);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getCode() {
    return this.code.getValue();
  }

  getTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.getDiscount(total);
    }
    total += this.freight;
    return total;
  }
}
