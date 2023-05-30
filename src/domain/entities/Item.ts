export default class Item {
  constructor(
    readonly productId: number,
    readonly price: number,
    readonly quantity: number,
    readonly currencyCode: string = "BRL",
    readonly currencyValue: number = 1
  ) {
    if (quantity <= 0) throw new Error("Item quantity cannot be negative");
  }

  getTotal() {
    return this.price * this.quantity * this.currencyValue;
  }
}
