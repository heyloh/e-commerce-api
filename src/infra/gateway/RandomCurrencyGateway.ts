import Currencies from "../../domain/entities/Currencies";
import CurrencyGateway from "./CurrencyGateway";

export default class RandomCurrencyGateway implements CurrencyGateway {
  async getCurrencies() {
    const currencies = new Currencies();
    currencies.addCurrency("BRL", 1);
    currencies.addCurrency("USD", 3 + Math.random());
    return currencies;
  }
}
