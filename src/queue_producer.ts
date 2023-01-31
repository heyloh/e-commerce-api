import amqp from "amqplib";

async function init() {
  const connection = amqp.connect("amqp://localhost");
  const channel = (await connection).createChannel();
  await (await channel).assertQueue("checkout", { durable: true });
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
    ],
  };
  (await channel).sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

init();
