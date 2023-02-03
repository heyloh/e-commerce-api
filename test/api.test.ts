import axios from "axios";

axios.defaults.validateStatus = () => {
  return true;
};

test("Não deve fazer um pedido com CPF inválido", async () => {
  const input = {
    cpf: "313.030.210-34",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid CPF");
});

test("Deve fazer um pedido com três produtos", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
    ],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6350);
});

test("Não deve fazer um pedido com produto que não existe", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [{ productId: 5, quantity: 1 }],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Product not found");
});

test("Deve fazer um pedido com três produtos com cupom de desconto", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(5132);
});

test("Não deve aplicar cupom de desconto expirado", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
    ],
    coupon: "VALE20_EXPIRED",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6350);
});

test("Não deve fazer pedido com a quantidade de um item negativa", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [{ productId: 3, quantity: -1 }],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Product quantity cannot be negative");
});

test("Não deve fazer pedido se o mesmo item for informado mais de uma vez", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 2, quantity: 1 },
      { productId: 2, quantity: 1 },
    ],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Product cannot be repeated");
});

test("Deve fazer um pedido com um produto e calcular o frete", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(1030);
});

test("Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      {
        productId: 3,
        quantity: 1,
      },
    ],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(40);
});
