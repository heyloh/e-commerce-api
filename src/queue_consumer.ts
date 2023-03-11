import amqp from "amqplib";
import Checkout from "./Checkout";
import CouponDataDatabase from "./CouponDataDatabase";
import OrderDataDatabase from "./OrderDataDatabase";
import ProductDataDatabase from "./ProductDataDatabase";

async function init() {
  const connectionQueue = amqp.connect("amqp://localhost");
  const channel = (await connectionQueue).createChannel();
  await (await channel).assertQueue("checkout", { durable: true });
  (await channel).consume("checkout", async function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const productData = new ProductDataDatabase();
      const couponData = new CouponDataDatabase();
      const orderData = new OrderDataDatabase();
      const checkout = new Checkout(productData, couponData, orderData);
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
    (await channel).ack(msg);
  });
}

init();
