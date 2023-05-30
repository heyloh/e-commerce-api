import SimulateFreight from "../src/application/SimulateFreight";
import ProductDataDatabase from "../src/infra/data/ProductDataDatabase";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";

test("Deve simular o frete para um pedido", async () => {
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const simulateFreight = new SimulateFreight(productData);
  const input = {
    items: [{ productId: 1, quantity: 1 }],
  };
  const output = await simulateFreight.execute(input);
  expect(output.total).toBe(30);
  await connection.close();
});
