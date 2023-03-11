import sinon from "sinon";
import Checkout from "../src/Checkout";
import CurrencyGateway from "../src/CurrencyGateway";
import RandomCurrencyGateway from "../src/RandomCurrencyGateway";
import { setup } from "./test-utils";

test("Deve fazer um pedido com 3 produtos", async () => {
  const { input, orderData, productData, couponData } = setup(false);
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Stub", async () => {
  const currencyGatewayStub = sinon
    .stub(RandomCurrencyGateway.prototype, "getCurrencies")
    .resolves({
      BRL: 1,
      USD: 2,
    });

  const { input, orderData, productData, couponData } = setup(true);

  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);

  currencyGatewayStub.restore();
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Mock", async () => {
  const currencyGatewayMock = sinon.mock(RandomCurrencyGateway.prototype);
  currencyGatewayMock.expects("getCurrencies").resolves({
    BRL: 1,
    USD: 2,
  });

  const { input, orderData, productData, couponData } = setup(true);

  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);

  currencyGatewayMock.verify();
  currencyGatewayMock.restore();
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Fake", async () => {
  const { input, orderData, productData, couponData } = setup(true);
  const currencyGateway: CurrencyGateway = {
    async getCurrencies(): Promise<any> {
      return {
        USD: 2,
        BRL: 1,
      };
    },
  };

  const checkout = new Checkout(productData, couponData, orderData, currencyGateway);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
});

test("Deve simular o frete, retornando o frete previsto para o pedido", () => {});

test("Deve validar o cupom de desconto, indicando em um boolean se o cupom é válido", () => {});


test("Deve fazer um pedido com 3 produtos com código do pedido", async () => {
  const { input, orderData, productData, couponData } = setup(false);
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.code).toBe("202300000003");
});
