import Checkout from "../src/Checkout";
import CouponDataDatabase from "../src/CouponDataDatabase";
import GetOrderByCpf from "../src/GetOrderByCpf";
import OrderDataDatabase from "../src/OrderDataDatabase";
import ProductDataDatabase from "../src/ProductDataDatabase";
import { setup } from "./test-utils";

test("Deve consultar um pedido", async () => {
  const productData = new ProductDataDatabase();
  const couponData = new CouponDataDatabase();
  const orderData = new OrderDataDatabase();
  const checkout = new Checkout(productData, couponData, orderData);

  const { input } = setup(false);
  await checkout.execute(input);

  const getOrderByCpf = new GetOrderByCpf(orderData);
  const output = await getOrderByCpf.execute(input.cpf);
  expect(output.total).toBe(6350);
});
