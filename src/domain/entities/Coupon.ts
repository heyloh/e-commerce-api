export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiryDate: Date
  ) {}

  isExpired() {
    return this.expiryDate.getTime() < Date.now();
  }

  getDiscount(total: number) {
    return (total * this.percentage) / 100;
  }
}
