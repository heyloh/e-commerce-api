import pgp from "pg-promise";
import CouponData from "../../domain/data/CouponData";
import Coupon from "../../domain/entities/Coupon";
import Connection from "../database/Connection";

export default class CouponDataDatabase implements CouponData {
  constructor(readonly connection: Connection) {}

  async getCoupon(code: string): Promise<any> {
    const [coupon] = await this.connection.query(
      "select * from cccat9.coupon where code = $1",
      [code]
    );
    if (!coupon) throw new Error("Coupon not found");
    return new Coupon(
      coupon.code,
      parseFloat(coupon.percentage),
      coupon.expiry_date
    );
  }
}
