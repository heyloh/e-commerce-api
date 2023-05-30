import Coupon from "../src/domain/entities/Coupon";
import Order from "../src/domain/entities/Order";
import Product from "../src/domain/entities/Product";

test("Deve criar um pedido vazio com CPF válido", () => {
  const order = new Order("987.654.321-00");
  expect(order.getTotal()).toBe(0);
});

test("Não deve criar um pedido vazio com CPF inválido", () => {
  expect(() => new Order("313.030.210-34")).toThrow("Invalid CPF");
});

test("Deve criar um pedido com 3 itens", () => {
  const order = new Order("987.654.321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getTotal()).toBe(6350);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", () => {
  const order = new Order("987.654.321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2023-12-10T10:00:00")));
  expect(order.getTotal()).toBe(5132);
});

test("Não deve criar um pedido com item com quantidade negativa", () => {
  const order = new Order("987.654.321-00");
  expect(() =>
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), -1)
  ).toThrow("Item quantity cannot be negative");
});

test("Não deve criar um pedido com item duplicado", () => {
  const order = new Order("987.654.321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  expect(() =>
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1)
  ).toThrow("Product cannot be repeated");
});

test("Deve criar um pedido com 3 itens com código", () => {
  const order = new Order("987.654.321-00", new Date("2022-12-10T10:00:00"), 1);
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getCode()).toBe("202200000001");
});
