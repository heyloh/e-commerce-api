import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";

const input: any = {
  items: [],
};

process.stdin.on("data", async (chunk) => {
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
    try {
      const connection = new PgPromiseConnection();
      const productData = new ProductDataDatabase(connection);
      const couponData = new CouponDataDatabase(connection);
      const orderData = new OrderDataDatabase(connection);
      const checkout = new Checkout(productData, couponData, orderData);
      const output = await checkout.execute(input);
      await connection.close();
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
  }
});
