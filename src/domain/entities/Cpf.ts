export default class Cpf {
  private value: string

  constructor(value: string) {
    if (!this.validate(value)) throw new Error("Invalid CPF")
    this.value = value;
  }

  validate(rawCpf: string) {
    const cleanCpf = rawCpf.replace(/\D/g, "");
    if (this.isInvalidLength(cleanCpf)) return false;
    if (this.allDigitsTheSame(cleanCpf)) return false;
    const calculatedFirstDigit = this.calculateDigit(cleanCpf, 10);
    const calculatedSecondDigit = this.calculateDigit(cleanCpf, 11);
    const actualDigit = this.extractDigits(cleanCpf);
    const calculatedDigit = `${calculatedFirstDigit}${calculatedSecondDigit}`;
    return actualDigit === calculatedDigit;
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  isInvalidLength(cpf: string) {
    return cpf.length !== 11;
  }

  allDigitsTheSame(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  extractDigits(cpf: string) {
    return cpf.slice(9);
  }

  getValue() {
    return this.value;
  }
}
