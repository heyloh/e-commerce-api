export default class Product {
  constructor(
    readonly productId: number,
    readonly description: string,
    readonly price: number,
    readonly height: number,
    readonly width: number,
    readonly length: number,
    readonly weight: number,
    readonly currency: string = 'BRL'
  ) {}
}
