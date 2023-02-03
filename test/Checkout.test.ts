import sinon from "sinon";
import Checkout from "../src/Checkout";
import CouponData from "../src/CouponData";
import CurrencyGateway from "../src/CurrencyGateway";
import ProductData from "../src/ProductData";


test("Deve fazer um pedido com 3 produtos", async () => {
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
          description: 'A',
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
        },
        2: {
          productId: 2,
          description: 'B',
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
        },
        3: {
          productId: 3,
          description: 'C',
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
        }
      };
      return products[productId];
    },
  };
  const couponData: CouponData = {
    async getCoupon(code: string): Promise<any> {
      const coupons: { [code: string]: any} = {
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
  const checkout = new Checkout(productData, couponData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com quatro produtos em moedas diferentes", async () => {
  const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves({
    BRL: 1,
    USD: 2,
  })

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
          description: 'A',
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: 'BRL'
        },
        2: {
          productId: 2,
          description: 'B',
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: 'BRL'
        },
        3: {
          productId: 3,
          description: 'C',
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: 'BRL'
        },
        4: {
          productId: 4,
          description: 'D',
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: 'USD'
        },
      };
      return products[productId];
    },
  };
  const couponData: CouponData = {
    async getCoupon(code: string): Promise<any> {
      const coupons: { [code: string]: any} = {
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
  const checkout = new Checkout(productData, couponData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
  currencyGatewayStub.restore();
});
