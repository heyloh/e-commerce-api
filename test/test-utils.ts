import CouponData from "../src/CouponData";
import OrderData from "../src/OrderData";
import ProductData from "../src/ProductData";

export const setup = (hasCurrencies: boolean) => {
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
  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 2;
    }
  };
  return {
    ...(hasCurrencies ? withCurrencies() : withoutCurrencies()),
    couponData,
    orderData,
  };
};

export const withoutCurrencies = () => {
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

export const withCurrencies = () => {
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
