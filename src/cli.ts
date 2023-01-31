import { validate } from "./CpfValidator";
import pgPromise from "pg-promise";

const input: any = {
  items: []
};


const connection = pgPromise()(
  "postgres://postgres:123456@localhost:5432/app-branas"
);

process.stdin.on('data', async (chunk) => {
  const command = chunk.toString().replace(/\n/g, "");
  if (command.startsWith("set-cpf")) {
    const params = command.replace("set-cpf", "");
    input.cpf = params;
  }
  if (command.startsWith("add-item")) {
    const params = command.replace("add-item", "");
    const [productId, quantity] = params.trim().split(" ");
    input.items.push({ productId, quantity });
  }
  if (command.startsWith("checkout")) {
    const isCpfValid = validate(input.cpf);
    if (!isCpfValid) {
      console.log("Invalid CPF");
      return;
    }
    let total = 0;
    let freight = 0;
    const productIds: number[] = [];
    for (const item of input.items) {
      if (productIds.some(productId => productId === item.productId)) {
        console.log("Product cannot be repeated");
        return;
      }
      productIds.push(item.productId)
      if (item.height <= 0 || item.width <= 0 || item.depth <= 0) {
        console.log("Product dimensions cannot be negative");
        return;
      }
      if (item.weight <= 0) {
        console.log("Product weight cannot be negative");
        return;
      }
      if (item.quantity <= 0) {
        console.log("Product quantity cannot be negative");
        return;
      }
      const [product] = await connection.query(
        "select * from cccat9.product where product_id = $1",
        [item.productId]
      );
      if (!product) {
        console.log("Product not found");
        return;
      }
      total += parseFloat(product.price) * item.quantity;
      const volume = (product.height / 100) * (product.width / 100) * (product.length / 100);
      const density = parseFloat(product.weight) / volume;
      const itemFreight = 1000 * volume * (density / 100);
      freight += (itemFreight >= 10) ? itemFreight : 10;
    }
    if (input.coupon) {
      const [coupon] = await connection.query(
        "select * from cccat9.coupon where code = $1",
        [input.coupon]
      );
      const isCouponExpired = coupon.expiry_date.getTime() < Date.now();
      if (coupon && !isCouponExpired) {
        total -= (total * coupon.percentage) / 100;
      }
    }
    total += freight;
    console.log({ total });
  }
})