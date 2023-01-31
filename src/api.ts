import express from "express";
import { validate } from "./CpfValidator";
import pgPromise from "pg-promise";

const app = express();
app.use(express.json());

const connection = pgPromise()(
  "postgres://postgres:123456@localhost:5432/app-branas"
);

app.post("/checkout", async (request, response) => {
  const { cpf, items } = request.body;
  const isCpfValid = validate(cpf);
  if (!isCpfValid) {
    return response.status(422).json({
      message: "Invalid CPF",
    });
  }
  let total = 0;
  let freight = 0;
  const productIds: number[] = [];
  for (const item of items) {
    if (productIds.some(productId => productId === item.productId)) {
      return response.status(422).json({
        message: "Product cannot be repeated"
      })
    }
    productIds.push(item.productId)
    if (item.height <= 0 || item.width <= 0 || item.depth <= 0) {
      return response.status(422).json({
        message: "Product dimensions cannot be negative",
      });
    }
    if (item.weight <= 0) {
      return response.status(422).json({
        message: "Product weight cannot be negative",
      });
    }
    if (item.quantity <= 0) {
      return response.status(422).json({
        message: "Product quantity cannot be negative",
      });
    }
    const [product] = await connection.query(
      "select * from cccat9.product where product_id = $1",
      [item.productId]
    );
    if (!product) {
      return response.status(422).json({
        message: "Product not found",
      });
    }
    total += parseFloat(product.price) * item.quantity;
    const volume = (product.height / 100) * (product.width / 100) * (product.length / 100);
    const density = parseFloat(product.weight) / volume;
    const itemFreight = 1000 * volume * (density / 100);
    freight += (itemFreight >= 10) ? itemFreight : 10;
  }
  if (request.body.coupon) {
    const [coupon] = await connection.query(
      "select * from cccat9.coupon where code = $1",
      [request.body.coupon]
    );
    const isCouponExpired = coupon.expiry_date.getTime() < Date.now();
    if (coupon && !isCouponExpired) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  total += freight;
  return response.json({ total });
});

app.listen(3000);
