import express from "express";
import Checkout from "./Checkout";
import CouponDataDatabase from "./CouponDataDatabase";
import OrderDataDatabase from "./OrderDataDatabase";
import ProductDataDatabase from "./ProductDataDatabase";

const app = express();
app.use(express.json());

app.post("/checkout", async (request, response) => {
  const input = request.body;
  try {
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
    const orderData = new OrderDataDatabase();
    const checkout = new Checkout(productData, couponData, orderData);
    const output = await checkout.execute(input);
    response.json(output);
  } catch (error: any) {
    response.status(422).json({
      message: error.message
    });
  }
});

app.listen(3000);
