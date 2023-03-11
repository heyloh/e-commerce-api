import pgp from "pg-promise";
import CouponData from "./CouponData";

export default class CouponDataDatabase implements CouponData {
  async getCoupon(code: string): Promise<any> {
    const connection = pgp()(
      "postgres://postgres:123456@localhost:5432/app-branas"
    );
    const [coupon] = await connection.query(
      "select * from cccat9.coupon where code = $1",
      [code]
    );
    await connection.$pool.end();
    return coupon;
  }
}
