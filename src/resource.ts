import pgp from "pg-promise";

export async function getProduct(productId: number) {
  const connection = pgp()(
    "postgres://postgres:123456@localhost:5432/app-branas"
  );
  const [product] = await connection.query(
    "select * from cccat9.product where product_id = $1",
    [productId]
  );
  return product;
}

export async function getCoupon(code: string) {
  const connection = pgp()(
    "postgres://postgres:123456@localhost:5432/app-branas"
  );
  const [coupon] = await connection.query(
    "select * from cccat9.coupon where code = $1",
    [code]
  );
  return coupon;
}
