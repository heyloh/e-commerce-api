export default interface ProductData {
  getProduct (productId: number): Promise<any>
}
