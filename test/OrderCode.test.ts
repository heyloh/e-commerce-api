import OrderCode from "../src/domain/entities/OrderCode";

test("Deve criar um código para o pedido", () => {
  const orderCode = new OrderCode(new Date("2022-12-10T10:00:00"), 1);
  expect(orderCode.getValue()).toBe("202200000001");
});

test("Não deve criar um código para o pedido se sequence for negativa", () => {
  expect(() => new OrderCode(new Date("2022-12-10T10:00:00"), -1)).toThrow(
    "Sequence cannot be negative"
  );
});
