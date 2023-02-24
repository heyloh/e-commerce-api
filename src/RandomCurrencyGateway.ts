import CurrencyGateway from "./CurrencyGateway";

export default class RandomCurrencyGateway implements CurrencyGateway {
  async getCurrencies() {
    return {
      BRL: 1,
      USD: 3 + Math.random(),
    };
  }
}
