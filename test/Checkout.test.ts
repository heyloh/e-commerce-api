import sinon from "sinon";
import { setup } from "./test-utils";
import Checkout from "../src/application/Checkout";
import Currencies from "../src/domain/entities/Currencies";
import CurrencyGateway from "../src/infra/gateway/CurrencyGateway";
import RandomCurrencyGateway from "../src/infra/gateway/RandomCurrencyGateway";

test("Deve fazer um pedido com 3 produtos", async () => {
  const { input, orderData, productData, couponData } = setup(false);
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com 3 produtos com código do pedido", async () => {
  const { input, orderData, productData, couponData } = setup(false);
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.code).toBe("202300000001");
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Stub", async () => {
  const currencies = new Currencies();
  currencies.addCurrency("BRL", 1);
  currencies.addCurrency("USD", 2);

  const currencyGatewayStub = sinon
    .stub(RandomCurrencyGateway.prototype, "getCurrencies")
    .resolves(currencies);

  const { input, orderData, productData, couponData } = setup(true);

  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);

  currencyGatewayStub.restore();
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Mock", async () => {
  const currencies = new Currencies();
  currencies.addCurrency("BRL", 1);
  currencies.addCurrency("USD", 2);

  const currencyGatewayMock = sinon.mock(RandomCurrencyGateway.prototype);
  currencyGatewayMock.expects("getCurrencies").resolves(currencies);

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
    async getCurrencies(): Promise<Currencies> {
      const currencies = new Currencies();
      currencies.addCurrency("BRL", 1);
      currencies.addCurrency("USD", 2);
      return currencies;
    },
  };

  const checkout = new Checkout(
    productData,
    couponData,
    orderData,
    currencyGateway
  );
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
});
