import Checkout from "../src/application/Checkout";
import GetOrderByCpf from "../src/application/GetOrderByCpf";
import CouponDataDatabase from "../src/infra/data/CouponDataDatabase";
import OrderDataDatabase from "../src/infra/data/OrderDataDatabase";
import ProductDataDatabase from "../src/infra/data/ProductDataDatabase";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";
import { setup } from "./test-utils";

test("Deve consultar um pedido", async () => {
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const checkout = new Checkout(productData, couponData, orderData);

  const { input } = setup(false);
  await checkout.execute(input);

  const getOrderByCpf = new GetOrderByCpf(orderData);
  const output = await getOrderByCpf.execute(input.cpf);
  expect(output.total).toBe(6350);

  await connection.close();
});
