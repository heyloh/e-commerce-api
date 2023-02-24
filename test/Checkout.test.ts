import sinon from "sinon";
import Checkout from "../src/Checkout";
import CouponData from "../src/CouponData";
import CurrencyGateway from "../src/CurrencyGateway";
import ProductData from "../src/ProductData";
import RandomCurrencyGateway from "../src/RandomCurrencyGateway";

const setup = (hasCurrencies: boolean) => {
  const couponData: CouponData = {
    async getCoupon(code: string): Promise<any> {
      const coupons: { [code: string]: any } = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expiry_date: new Date("2024-12-30T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expiry_date: new Date("2022-12-30T10:00:00"),
        },
      };
      return coupons[code];
    },
  };
  return {
    ...(hasCurrencies ? withCurrencies() : withoutCurrencies()),
    couponData,
  };
};

const withoutCurrencies = () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
    ],
  };
  const productData: ProductData = {
    async getProduct(productId: number): Promise<any> {
      const products: { [productId: number]: any } = {
        1: {
          productId: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
        },
        2: {
          productId: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
        },
        3: {
          productId: 3,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
        },
      };
      return products[productId];
    },
  };

  return { input, productData };
};

const withCurrencies = () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 },
      { productId: 4, quantity: 1 },
    ],
  };

  const productData: ProductData = {
    async getProduct(productId: number): Promise<any> {
      const products: { [productId: number]: any } = {
        1: {
          productId: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "BRL",
        },
        2: {
          productId: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          productId: 3,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          productId: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
        },
      };
      return products[productId];
    },
  };

  return { input, productData };
};

test("Deve fazer um pedido com 3 produtos", async () => {
  const { input, productData, couponData } = setup(false);
  const checkout = new Checkout(productData, couponData);
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

  const { input, productData, couponData } = setup(true);

  const checkout = new Checkout(productData, couponData);
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

  const { input, productData, couponData } = setup(true);

  const checkout = new Checkout(productData, couponData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);

  currencyGatewayMock.verify();
  currencyGatewayMock.restore();
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes com Fake", async () => {
  const { input, productData, couponData } = setup(true);
  const currencyGateway: CurrencyGateway = {
    async getCurrencies(): Promise<any> {
      return {
        USD: 2,
        BRL: 1,
      };
    },
  };

  const checkout = new Checkout(productData, couponData, currencyGateway);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
});
